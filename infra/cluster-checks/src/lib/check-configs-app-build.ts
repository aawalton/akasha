import { SECRETS, secret } from "../../../../tools/lib/workflow-dsl/secrets.ts"
import { BUNDLE_REUSE_DIST_ENV } from "@temper/shared-build-deploy-addons-resolve/distributable"
import { ADDON_BUILD_CHECK_NAME } from "./addon-build-co-dep"
import type { CheckConfig } from "./check-configs-types"

export const ADDON_BUNDLE_BUILD_PACKAGES: ReadonlySet<string> = new Set(["@temper/web"])

export interface AppBuildCandidate {
  readonly name: string
  readonly dir: string
  readonly hasBuildScript: boolean
}

export interface AppBuildTarget {
  readonly name: string
  readonly dir: string
}

export function appBuildSlug(dir: string): string {
  return dir.replace(/^packages\//, "").replaceAll("/", "-")
}

export function selectAppBuildPackages(
  entries: readonly AppBuildCandidate[]
): readonly AppBuildTarget[] {
  const selected = entries
    .filter((e) => e.hasBuildScript)
    .map((e) => ({ name: e.name, dir: e.dir }))
    .sort((a, b) => a.dir.localeCompare(b.dir))
  if (selected.length === 0) {
    throw new Error(
      `selectAppBuildPackages: none of the ${entries.length} workspace(s) given declares a \`scripts.build\`, so every app-build gate would vanish from the \`check\` workflow and the branch would go green one bundler pass shorter. Refusing rather than gating nothing.`
    )
  }
  return selected
}

export function buildAppBuildChecks(packages: readonly AppBuildTarget[]): readonly CheckConfig[] {
  return [...packages]
    .sort((a, b) => a.dir.localeCompare(b.dir))
    .map((p) => {
      const chainsAddonBundle = ADDON_BUNDLE_BUILD_PACKAGES.has(p.name)
      return {
        name: `app-build-${appBuildSlug(p.dir)}`,
        dispatchNodes: [
          `package:code:${p.name}`,
          "ts-file:code:infra/cluster-checks/src/lib/check-configs-app-build.ts",
        ],
        ...(chainsAddonBundle ? { dependsOn: [ADDON_BUILD_CHECK_NAME] } : {}),
        environment: {
          NEXT_PUBLIC_SUPABASE_URL: "https://placeholder.invalid",
          NEXT_PUBLIC_SUPABASE_ANON_KEY: "placeholder-anon-key",
          NEXT_PUBLIC_ELECTRIC_URL: "https://placeholder.invalid/electric/v1/shape",
          ...(chainsAddonBundle
            ? {
                SUPABASE_URL: secret(SECRETS.SUPABASE_URL),
                SUPABASE_SERVICE_ROLE_KEY: secret(SECRETS.SUPABASE_SERVICE_ROLE_KEY),
                [BUNDLE_REUSE_DIST_ENV]: "1",
              }
            : {}),
        },
        backendOptions: {
          kubernetes: {
            resources: {
              requests: { cpu: "2000m", memory: chainsAddonBundle ? "2Gi" : "1500Mi" },
              limits: { memory: "4Gi" },
            },
          },
        },
        commands: (ci) => [`cd ${ci.workspace}/${p.dir} && mkdir -p node_modules && bun run build`],
      }
    })
}
