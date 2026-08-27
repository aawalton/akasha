import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { IMAGES } from "../../../tools/lib/workflow-dsl/images.ts"
import { SECRETS, secret } from "../../../tools/lib/workflow-dsl/secrets.ts"
import { step } from "../../../tools/lib/workflow-dsl/step.ts"
import type { BackendOptions, CIContext, Step } from "../../../tools/lib/workflow-dsl/types.ts"
import { workflow } from "../../../tools/lib/workflow-dsl/workflow.ts"
import { STATIC_CHECKS } from "./lib/check-configs"
import { type CheckConfig } from "./lib/check-configs-types"
import { ACYCLICITY_CHECKS } from "./lib/check-configs-acyclicity"
import { ADDON_CHECKS } from "./lib/check-configs-addons"
import {
  type AppBuildCandidate,
  buildAppBuildChecks,
  selectAppBuildPackages,
} from "./lib/check-configs-app-build"
import { buildAppTypecheckChecks } from "./lib/check-configs-app-typecheck"
import { ARCHITECTURE_CHECKS } from "./lib/check-configs-architecture"
import {
  buildClientEnvInlinedCheck,
  buildRrServerModuleInClientCheck,
  CAPACITOR_CHECKS,
} from "./lib/check-configs-capacitor"
import { CI_META_CHECKS } from "./lib/check-configs-ci-meta"
import { buildLcccVendorDriftCheck, CODEGEN_CHECKS } from "./lib/check-configs-codegen"
import { COMPONENT_CHECKS } from "./lib/check-configs-component"
import { K8S_CHECKS } from "./lib/check-configs-k8s"
import { PACKAGE_CHECKS } from "./lib/check-configs-package"
import { RAW_BYTE_CHECKS } from "./lib/check-configs-raw-bytes"
import { RBAC_CHECKS } from "./lib/check-configs-rbac"
import {
  buildServiceTypecheckChecks,
  type LeafPackageEntry,
  parseRootReferenceDirs,
  ROOT_TSCONFIG_PATH,
  selectRootReferenceExclusions,
  selectServiceTypecheckPackages,
} from "./lib/check-configs-service-typecheck"
import { SOURCE_SCANNER_CHECKS } from "./lib/check-configs-source-scanners"
import { TYPESAFETY_CHECKS } from "./lib/check-configs-typesafety"
import { CHECK_WORKFLOW_DISPATCH_NODE_TYPES } from "./lib/check-workflow-watch"
import { readFunctionalType } from "../../../tools/lib/check-workflow/functional-type"
import { discoverLcccVendorSites } from "../../../tools/lib/check-workflow/lccc-vendor-sites"
import { getRepoRoot } from "./lib/repo-root"
import { discoverRouterApps } from "../../../tools/lib/check-workflow/router-apps"
import { routedCheckCommand } from "./lib/run-check-routing"
import { loadTestStepInputs } from "../../../tools/lib/check-workflow/test-step-loader"
import { generateTestSteps, type TestType } from "../../../tools/lib/check-workflow/test-step-paths"
import { selectUnbuiltRouterApps } from "../../../tools/lib/check-workflow/unbuilt-router-apps"

const repoRoot = getRepoRoot()

const { workspaces, testsByType, closure, rootToName } = loadTestStepInputs(repoRoot)

const appBuildCandidates: AppBuildCandidate[] = workspaces.map((ws) => ({
  name: ws.name,
  dir: ws.root,
  hasBuildScript: ws.pkg.scripts?.build !== undefined,
}))
const DEPLOYABLE_APPS = selectAppBuildPackages(appBuildCandidates)
const DEPLOYABLE_APP_NAMES = new Set(DEPLOYABLE_APPS.map((app) => app.name))

const APP_BUILD_CHECKS = buildAppBuildChecks(DEPLOYABLE_APPS)

const APP_TYPECHECK_CHECKS = buildAppTypecheckChecks(DEPLOYABLE_APPS)

const rootReferenceDirs = parseRootReferenceDirs(
  readFileSync(resolve(repoRoot, ROOT_TSCONFIG_PATH), "utf-8")
)
const leafPackageEntries: LeafPackageEntry[] = workspaces.map((ws) => ({
  name: ws.name,
  dir: ws.root,
  functionalType: readFunctionalType(ws.packageJsonPath).type,
  inRootReferences: rootReferenceDirs.has(ws.root),
}))
const SERVICE_TYPECHECK_CHECKS = buildServiceTypecheckChecks(
  selectServiceTypecheckPackages(leafPackageEntries, DEPLOYABLE_APP_NAMES),
  selectRootReferenceExclusions(leafPackageEntries, DEPLOYABLE_APP_NAMES)
)

const ROUTER_APPS = discoverRouterApps(repoRoot)
const CLIENT_ENV_INLINED_CHECK = buildClientEnvInlinedCheck(ROUTER_APPS)

const RR_SERVER_MODULE_CHECK = buildRrServerModuleInClientCheck(
  selectUnbuiltRouterApps(ROUTER_APPS, new Set(DEPLOYABLE_APPS.map((app) => app.dir)))
)

const LCCC_VENDOR_DRIFT_CHECK = buildLcccVendorDriftCheck(discoverLcccVendorSites(repoRoot))

const generatedTestSteps = generateTestSteps({
  testsByType,
  workspaceRoots: workspaces.map((w) => w.root),
  closure,
  rootToName,
})

const STEP_PREFIX = "check-"

const DEFAULT_CHECK_CPU_REQUEST = "750m"

const DEFAULT_CHECK_MEMORY_LIMIT = "3Gi"

function withDefaultCheckResources(options: BackendOptions | undefined): BackendOptions {
  const resources = options?.kubernetes?.resources
  const cpu = resources?.requests?.cpu ?? DEFAULT_CHECK_CPU_REQUEST
  const memoryLimit = resources?.limits?.memory ?? DEFAULT_CHECK_MEMORY_LIMIT
  return {
    ...options,
    kubernetes: {
      ...options?.kubernetes,
      resources: {
        ...resources,
        requests: { ...resources?.requests, cpu },
        limits: { ...resources?.limits, memory: memoryLimit },
      },
    },
  }
}

function makeCheckStep(config: CheckConfig): Step {
  const image = config.image ?? IMAGES.BUN
  const explicitDeps = config.dependsOn?.map((d) => `${STEP_PREFIX}${d}`) ?? []

  const commands = (ci: CIContext): readonly string[] =>
    config.script === undefined
      ? config.commands(ci)
      : [
          routedCheckCommand({
            cwd: ci.workspace,
            script: config.script,
            args: config.args?.(ci),
          }),
        ]

  return step({
    name: `${STEP_PREFIX}${config.name}`,
    image,
    commands,
    script: config.script,
    volumes: config.volumes,
    environment: config.environment,
    backendOptions: withDefaultCheckResources(config.backendOptions),
    dispatchNodes: config.dispatchNodes,
    dispatchNodeTypes: config.dispatchNodeTypes,
    closurePolicy: config.closurePolicy,
    alwaysRun: config.alwaysRun,
    dependsOn: explicitDeps.length === 0 ? undefined : explicitDeps,
  })
}

const CPU_REQUEST_BY_TEST_TYPE = {
  unit: "5",
  property: "4",
  component: "4",
} satisfies Record<TestType, string>

const generatedTestStepConfigs: CheckConfig[] = generatedTestSteps.map(
  (testStep): CheckConfig => ({
    name: testStep.name,
    dispatchNodes: testStep.dispatchNodes,
    backendOptions: {
      kubernetes: {
        resources: {
          requests: { cpu: CPU_REQUEST_BY_TEST_TYPE[testStep.testType], memory: "1Gi" },
          limits: { cpu: "12", memory: "4Gi" },
        },
      },
    },
    dependsOn: ["reverse-reachability-graph"],
    environment: {
      SUPABASE_URL: secret(SECRETS.SUPABASE_URL),
      SUPABASE_SERVICE_ROLE_KEY: secret(SECRETS.SUPABASE_SERVICE_ROLE_KEY),
    },
    commands: (ci) => [
      `bash ${ci.workspace}/packages/infra/tests/run-typed-tests.sh ${ci.workspace} ${testStep.testType} ${ci.inputsHash}`,
    ],
  })
)

const checks: CheckConfig[] = [
  ...STATIC_CHECKS,
  ...RBAC_CHECKS,
  ...ACYCLICITY_CHECKS,
  ...ADDON_CHECKS,
  ...APP_BUILD_CHECKS,
  ...APP_TYPECHECK_CHECKS,
  ...CAPACITOR_CHECKS,
  CLIENT_ENV_INLINED_CHECK,
  RR_SERVER_MODULE_CHECK,
  ...SERVICE_TYPECHECK_CHECKS,
  ...ARCHITECTURE_CHECKS,
  ...CI_META_CHECKS,
  ...CODEGEN_CHECKS,
  ...COMPONENT_CHECKS,
  LCCC_VENDOR_DRIFT_CHECK,
  ...K8S_CHECKS,
  ...PACKAGE_CHECKS,
  ...RAW_BYTE_CHECKS,
  ...SOURCE_SCANNER_CHECKS,
  ...TYPESAFETY_CHECKS,
  ...generatedTestStepConfigs,
]

export const workflows = [
  workflow("check", {
    kind: "checks",
    dependsOn: ["preparation"],
    when: { event: "push", branch: "!main" },
    alwaysRun: true,
    dispatchNodeTypes: CHECK_WORKFLOW_DISPATCH_NODE_TYPES,
    steps: checks.map(makeCheckStep),
  }),
]
