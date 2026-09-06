import type { ChangePartial } from "../../change-partial.page-type.ts"

export const repointImports = {
  id: "01a04efb-db14-7000-a96d-4bace8327509",
  pageTypeSlug: "change-partial",
  slug: "repoint-imports",
  definition: "a body rewritten so the paths it names follow the files that moved",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body is rewritten in one run with each name replaced where the name sits rather than found again.",
    },
    {
      invariantKind: "departure",
      statement: "A name is written back quoted matching the way the body spells that name.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching nothing that moved is left as the name stands.",
    },
    {
      invariantKind: "departure",
      statement: "The path a package's name reaches moves without that name changing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name that is no module specifier is read against the folder of the body naming it.",
    },
    {
      invariantKind: "absence",
      statement: "Such a name is written back only where it lands on a path that moved.",
    },
    {
      invariantKind: "absence",
      statement: "A name holding no slash is left as that name is.",
    },
    {
      invariantKind: "departure",
      statement: "A body's own generated declarations sit in a `+types` folder beside the body.",
    },
    {
      invariantKind: "departure",
      statement: "Those declarations are named for the body naming them.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier naming them follows the body's new folder and new name.",
    },
    {
      invariantKind: "absence",
      statement: "No naming is handed in here.",
    },
  ],
} as const satisfies ChangePartial
