import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noColorLiteral = {
  id: "01a08227-08ad-7b40-b746-98282c6ab4de",
  type: "page-type/check-code",
  slug: "no-color-literal",
  definition: "the check refusing a color written out rather than taken from a design token",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A color a design token has is reached by name rather than written out again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The palette's own home writes its colors out and is judged by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This check's own home writes the grants out and is judged by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page states a value and dresses nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No page file is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color worked out from a token by relative color syntax is taken from a token.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An achromatic color at an alpha is a shadow rather than a shade of the palette.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An achromatic color among the other words of one value is let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A generated file is judged where its generator sits rather than where that file lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string that is one color on its own is judged wherever that string sits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color inside a utility class's bracketed value is judged as any color is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grant names one file and the values Alan let that file have.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each value a grant names has a reason.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A grant reaches only the file the grant names and only the values the grant names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The line a color sits on is read off an index of the body's line starts, built once a body.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
