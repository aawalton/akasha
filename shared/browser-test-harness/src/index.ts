export {
  type ConsoleCapture,
  type ConsoleEntry,
  createConsoleBuffer,
  createConsoleCapture,
  formatConsoleDump,
} from "./console-capture"
export {
  classifyExpectedAttr,
  classifyExpectedCount,
  classifyExpectedTitleDom,
  classifyExpectedTitleInitialHtml,
  decideDeployedRenderVerdict,
  discriminatingAssertions,
  type ExpectedAttrMode,
  type ExpectedAttrStatus,
  type ExpectedCountStatus,
  type ExpectedTextStatus,
  type ExpectedTitleDomStatus,
  type ExpectedTitleInitialHtmlStatus,
  type RenderObservation,
  type RenderVerdict,
} from "./deployed-render-check"
export {
  type BrowserTestEnv,
  logBrowserSkip,
  type ReadBrowserTestEnvResult,
  type RealUserOptInEnv,
  readBrowserTestEnv,
  readRealUserOptInEnv,
} from "./env"
export { readWorktreeGitFacts } from "./git-facts"
export {
  type CreateReadOnlyRealUserHarnessOptions,
  type CreateReadOnlyThrowawayHarnessOptions,
  createReadOnlyAnonSession,
  createReadOnlyRealUserHarness,
  createReadOnlyThrowawayHarness,
  type ReadOnlyAnonSession,
  type ReadOnlyBrowserHarness,
} from "./harness"
export {
  decidePrewarmStep,
  PREWARM_MAX_MS,
  PREWARM_QUIET_MS,
  type PrewarmDecisionInput,
  type PrewarmResult,
  type PrewarmStep,
  prewarmDevServer,
} from "./prewarm"
export {
  decideTargetGuard,
  isLocalhostTarget,
  type TargetGuardDecision,
  type TargetGuardInput,
  type WorktreeGitFacts,
} from "./target-guard"
