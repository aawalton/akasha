import type { CodeCheck } from "../../code-check.page-type.ts"

export const noColorLiteral = {
  id: "01a08227-08ad-7b40-b746-98282c6ab4de",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-color-literal",
  definition: "the check refusing a color written out rather than taken from a design token",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
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
      statement: "A page states a value and dresses nothing, so no page file is judged.",
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
      statement: "A generated file is judged where its generator is rather than where it lands.",
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
      statement:
        "A grant names one file and the values Alan let that file have, each with a reason.",
    },
    {
      invariantKind: "departure",
      statement: "A grant reaches only the file the grant names and only the values it names.",
    },
    {
      invariantKind: "gap",
      statement: "No check has a design token value to the color page that value is read from.",
    },
  ],
  check: { maxCpuSeconds: 10 },
} as const satisfies CodeCheck
