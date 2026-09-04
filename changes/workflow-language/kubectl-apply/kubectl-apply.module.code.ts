import { IMAGES } from "../images/images.module.code.ts"
import type { CIContext, Step } from "../workflow-types/workflow-types.module.code.ts"

interface KubectlApplyBase {
  name: string
  files: string
  recursive?: boolean
  imageSubstitution?: {
    placeholder: string
    tag: string | ((ci: CIContext) => string)
  }
  serverSide?: boolean
}

interface KubectlApplyConfig extends KubectlApplyBase {
  namespace: string
  excludes?: readonly string[]
}

function buildSedExpr(subs: readonly { placeholder: string; replacement: string }[]): string {
  return subs.map((s) => `-e "s|${s.placeholder}|${s.replacement}|g"`).join(" ")
}

export function kubectlApply(config: KubectlApplyConfig): Step {
  return buildApplyStep(config, config.namespace)
}

export function kubectlApplyClusterScoped(config: KubectlApplyBase): Step {
  return buildApplyStep(config, null)
}

function buildApplyStep(
  config: KubectlApplyBase & { excludes?: readonly string[] },
  namespace: string | null
): Step {
  const { name, files, recursive, excludes, imageSubstitution, serverSide } = config
  const isDirectory = files.endsWith("/")
  const allExcludes = isDirectory ? ["\\.sops\\.yaml$", ...(excludes ?? [])] : (excludes ?? [])
  const applyFlags = serverSide ? "--server-side --force-conflicts " : ""
  const nsFlag = namespace === null ? "" : `-n ${namespace} `

  return {
    name,
    image: IMAGES.KUBECTL,
    environment: { HOME: "/tmp" },
    commands: (ci: CIContext) => {
      const resolvedTag = imageSubstitution
        ? typeof imageSubstitution.tag === "function"
          ? imageSubstitution.tag(ci)
          : imageSubstitution.tag
        : null

      const subs: { placeholder: string; replacement: string }[] = []
      if (imageSubstitution != null && resolvedTag != null) {
        subs.push({ placeholder: imageSubstitution.placeholder, replacement: resolvedTag })
      }

      if (allExcludes.length > 0) {
        if (subs.length > 0) {
          const wsDir = `${ci.workspace}/${files}`
          const sedExpr = buildSedExpr(subs)
          return [
            `set -e`,
            `FILES=$(find ${wsDir} \\( -name '*.yaml' -o -name '*.yml' \\) | grep -v -E '${allExcludes.join("|")}')`,
            `if [ -z "$FILES" ]; then echo "No manifest files remain after exclusions"; exit 0; fi`,
            `for f in $FILES; do cat "$f"; echo "---"; done | sed ${sedExpr} | kubectl apply ${applyFlags}${nsFlag}-f -`,
          ]
        }
        if (serverSide) {
          throw new Error(
            "kubectlApply: serverSide=true is not supported with directory+excludes+no-imageSubstitution; either narrow `files` to a single yaml or extend the ci-apply-manifests shell script to honor --server-side"
          )
        }
        if (namespace === null) {
          throw new Error(
            "kubectlApplyClusterScoped: a directory `files` is not supported; the ci-apply-manifests shell script takes a namespace positionally. Name a single yaml instead."
          )
        }
        return [
          `sh "$AKASHA_ROOT/infrastructure/cluster-operations/ci-apply-manifests/ci-apply-manifests.shell-script.shell.sh" ${allExcludes.map((e) => `--exclude ${e}`).join(" ")} ${namespace} ${files}`,
        ]
      }

      if (subs.length > 0) {
        const sedExpr = buildSedExpr(subs)
        if (isDirectory) {
          return [
            `set -e`,
            `find ${ci.workspace}/${files} \\( -name '*.yaml' -o -name '*.yml' \\) ! -name '*.sops.yaml' -exec sh -c 'cat "$1"; echo "---"' _ {} \\; | sed ${sedExpr} | kubectl apply ${applyFlags}${nsFlag}-f -`,
          ]
        }
        return [
          `set -e`,
          `sed ${sedExpr} ${ci.workspace}/${files} | kubectl apply ${applyFlags}${nsFlag}-f -`,
        ]
      }

      let cmd = `kubectl apply ${applyFlags}${nsFlag}`.trimEnd()
      if (recursive) cmd += " -R"
      cmd += ` -f ${ci.workspace}/${files}`
      return [cmd]
    },
    backendOptions: {
      kubernetes: { serviceAccountName: "pipeline-engine" },
    },
  }
}
