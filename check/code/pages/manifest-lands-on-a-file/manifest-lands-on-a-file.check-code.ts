import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const manifestLandsOnAFile = {
  id: "01a05d75-de6d-726c-b07d-520ab5bfd098",
  type: "page-type/check-code",
  slug: "manifest-lands-on-a-file",
  definition: "the check refusing a way into a package that lands where no file is",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A way in names a file the change leaves behind that change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every manifest the index names is judged whether or not the change has that manifest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This check catches a file moving away from under a way in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is filed at the manifest rather than at the file that moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the specifier as well as the path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which ways in a manifest names is read by `package-manifest`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A manifest that will not parse names no way in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A manifest calling its package nothing names no way in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A key that is not a lone dot and does not open with a dot names no way in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Whether the file a way in lands on can be parsed is not judged here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A target nested under a condition is no way in this check judges.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A file named by `main` or `bin` is no way in this check judges.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A way in landing on a path spelling a `*` is no way in this check judges.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
