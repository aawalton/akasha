import type { Command } from "akasha/command/command.page-type.types.ts"

export const browserScreenshot = {
  id: "01a0c4c8-b6e7-7a74-b62b-1a048dd6963a",
  type: "page-type/command",
  slug: "browser-screenshot",
  definition: "the command writing a PNG of a page on a deployed site",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A localhost origin is refused rather than driven.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shot is taken once the render has settled rather than on the first paint.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A settle that ran out is shot as the page is rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run opens the browser as nobody unless `--signed-in` says otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--signed-in` shoots the page as the contributor Alan's person page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--full-page` shoots the whole scrolling page rather than what the window holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--expand-panels` opens every panel drawn closed before the shot is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel already open is left open rather than clicked shut.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sidebar's nav group drawn closed is a panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Panels are opened again until none is left closed or five rounds are spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The layout is given time to settle after the last panel opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is 1440 wide and 1000 tall where the call says neither.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder the file sits in is made where that folder is not there already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is the path written and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The browser is closed whether the shot was taken or thrown.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges what the shot shows.",
    },
  ],
  name: "screenshot",
  arguments: [
    { argument: "argument/url", required: true },
    { argument: "argument/path", required: true },
    { argument: "argument/out", required: true },
    { argument: "argument/width", default: "1440" },
    { argument: "argument/height", default: "1000" },
    { argument: "argument/full-page" },
    { argument: "argument/expand-panels" },
    { argument: "argument/signed-in" },
    { argument: "argument/sign-in-path" },
    { argument: "argument/root-selector" },
    { argument: "argument/hydration-selector" },
    { argument: "argument/timeout-ms" },
  ],
} as const satisfies Command
