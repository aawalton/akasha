import type { Finding } from "../finding.page-type.ts"

export const aBacktickCarriedIntoATemplateLiteralMadeTheHeaderATaggedTemplate = {
  id: "01a06864-8745-7000-a674-5f633651555b",
  pageTypeSlug: "finding",
  slug: "a-backtick-carried-into-a-template-literal-made-the-header-a-tagged-template",
  domainSlug: "domain/akasha-migration",
  claim:
    "A mechanical repoint that writes prose into an existing template literal must escape every backtick it carries, and neither Biome nor the landing refuses one that does not. Writing `*-rbac` into the generated-manifest header of cluster-rbac-manifest closed the literal, read `* -rbac` as multiplication by a negated identifier and made the rest a tagged template, so the module loaded no further and `akasha cluster-rbac-manifest` refused with `rbac is not defined` rather than with a syntax error naming the line.",
  evidence:
    "Landed at 1dd61ebe553d881145a6dd1be75172c92008c16a and repaired in the commit this finding lands in. The landing reported `formatted ... as it landed`, so Biome parsed and rewrote the file into `export const HEADER =\n  `...` *\n  -rbac`\n...`` and raised nothing: the text is valid TypeScript, just not the string it was meant to be.\n\nWhat caught it was running the command end to end rather than building the file. `bun build --target=bun` on the four modules the same batch touched all passed, and the command page loaded far enough to report a runtime ReferenceError. A byte diff of the emitted manifest against the pre-migration generator, rebuilt from blobs 510720b7a945dd10c51ccd7c16a4756df3160818 and the yaml-format blob beside it, is what the repair is checked by.\n\nThe general shape: a repoint that only changes a path is safe to do by string substitution, and one that also changes prose inside a template literal is not, because the substituted text carries delimiters of the language it lands in.",
} as const satisfies Finding
