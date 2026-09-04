import type { CodeCheck } from "../../code-check.page-type.ts"

export const restatementNarrowsSomething = {
  id: "01a058ff-fbf9-76dc-8437-ad9a61e75657",
  pageTypeSlug: "code-check",
  slug: "restatement-narrows-something",
  definition: "the check refusing a restatement of an inherited property that narrows nothing",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An inherited property is restated only to narrow that property.",
    },
    {
      invariantKind: "departure",
      statement: "A restatement moving no field in the narrowing direction is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Optional becoming required narrows.",
    },
    {
      invariantKind: "departure",
      statement: "A max falling narrows.",
    },
    {
      invariantKind: "departure",
      statement: "A total falling narrows.",
    },
    {
      invariantKind: "departure",
      statement: "A value moving out of the commit or out of the open narrows.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration is judged against the nearest declaration above that declaration.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types stand above a page type is walked through `extends-slug`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type is judged when the change carries that page type or a property that type declares.",
    },
    {
      invariantKind: "absence",
      statement: "A restatement that loosens is passed over here.",
    },
    {
      invariantKind: "absence",
      statement: "`key-names-one-property` refuses every loosening.",
    },
    {
      invariantKind: "absence",
      statement: "One restatement earns one refusal.",
    },
    {
      invariantKind: "absence",
      statement: "A record property inherits nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Its fields are not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "A page type saying one property twice over is not judged here.",
    },
    {
      invariantKind: "gap",
      statement: "A restatement raising a total while it narrows something else is refused.",
    },
  ],
} as const satisfies CodeCheck
