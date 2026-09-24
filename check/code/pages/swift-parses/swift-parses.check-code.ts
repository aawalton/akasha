import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const swiftParses = {
  id: "01a0d58c-dd89-71ff-aa5d-ad876fa7323c",
  type: "page-type/check-code",
  slug: "swift-parses",
  definition: "the check refusing a change whose Swift does not parse",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Swift files a change is judged by are the ones the change writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a Swift file parses depends on no other file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Audit is handed every Swift file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is Swift where the file kind the tree reads off its name is Swift.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Swift is parsed and not compiled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A parse needs no Apple library, so a module the Swift imports is never looked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The parser is `swift-format lint`, and only the errors it says bind.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A style warning the parser says is not judged here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One run of the parser reads every Swift file judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The parser reads a mirror written out of the bodies the change proposes rather than the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mirror has only the Swift files judged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The mirror is swept whatever the parser said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the file, the line and the column the parser faulted.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Swift a shell script writes out of a heredoc is not judged here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such Swift is a piece of a file only a run of that script puts together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The parser is on the host rather than among the declared dependencies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The workstation's brew formulae carry the parser.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The image an audit runs in carries the parser out of the Swift toolchain for Linux.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A machine without the parser cannot land a change carrying Swift.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run the parser could not finish is unmeasured rather than refusing.",
    },
  ],
  check: { maxCpuSeconds: 5 },
  audit: { maxCpuSeconds: 10 },
} as const satisfies CheckCode
