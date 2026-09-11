import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const noColorLiteral = {
  id: "01a08227-08ad-7b40-b746-98282c6ab4de",
  type: "code-check",
  slug: "no-color-literal",
  definition: "the check refusing a color written out rather than taken from a design token",
  runsOnChange: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A color a design token has is reached by name rather than written out again.",
    },
    {
      invariantKind: "departure",
      statement: "The palette's own home writes its colors out and is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "This check's own home writes the grants out and is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A page states a value and dresses nothing.",
    },
    {
      invariantKind: "departure",
      statement: "No page file is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A color worked out from a token by relative color syntax is taken from a token.",
    },
    {
      invariantKind: "departure",
      statement: "An achromatic color at an alpha is a shadow rather than a shade of the palette.",
    },
    {
      invariantKind: "departure",
      statement: "An achromatic color among the other words of one value is let through.",
    },
    {
      invariantKind: "departure",
      statement:
        "A generated file is judged where its generator sits rather than where that file lands.",
    },
    {
      invariantKind: "departure",
      statement: "A string that is one color on its own is judged wherever that string sits.",
    },
    {
      invariantKind: "departure",
      statement: "A color inside a utility class's bracketed value is judged as any color is.",
    },
    {
      invariantKind: "departure",
      statement: "A grant names one file and the values Alan let that file have.",
    },
    {
      invariantKind: "departure",
      statement: "Each value a grant names has a reason.",
    },
    {
      invariantKind: "departure",
      statement:
        "A grant reaches only the file the grant names and only the values the grant names.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
