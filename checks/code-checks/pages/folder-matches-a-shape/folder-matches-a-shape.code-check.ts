import type { CodeCheck } from "../../code-check.page-type.ts"

export const folderMatchesAShape = {
  id: "01a04e33-f281-7900-a29d-0b79e444ca98",
  pageTypeSlug: "code-check",
  slug: "folder-matches-a-shape",
  definition: "the check refusing a folder matching none of the folder shapes",
  partSlugs: ["module/shape-loading", "page-type/folder-shape"],
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder matching any shape is right.",
    },
    {
      invariantKind: "departure",
      statement: "A folder's name never opens with the slug of the page above that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder's name never opens with the plural slug of the page above that folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder opening with that name is refused whatever shape the folder would match.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is answered before any shape is asked.",
    },
    {
      invariantKind: "departure",
      statement: "The name a folder is asked for is its page's own with that opening taken off.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named for a part rather than for a page is asked for no such name.",
    },
    {
      invariantKind: "departure",
      statement: "A folder sitting under a part is named against the page above that part.",
    },
    {
      invariantKind: "departure",
      statement: "Every part between the folder and that page is looked through.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `modules` is a part of the page above that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `pages` is a part of the page above that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `properties` is a part of the page above that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named `scripts` is a part of the page above that folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder named by the one page in that folder is that page's own folder rather than a part.",
    },
    {
      invariantKind: "departure",
      statement: "Only a part is looked through when the page above a folder is looked for.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal carries what each shape said rather than ranking them.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reach written as the name a manifest states counts as one into the folder it lands in.",
    },
    {
      invariantKind: "departure",
      statement: "Those manifests are read as the change leaves those manifests.",
    },
    {
      invariantKind: "departure",
      statement: "Every folder above a changed path is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A shape reads what stands under a folder as well as what sits in the folder.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import the change adds or takes away is judged at the folder the import reaches.",
    },
    {
      invariantKind: "departure",
      statement: "An import inside a folder is no entrance to the folder.",
    },
    {
      invariantKind: "departure",
      statement: "Only a TypeScript file is read for the imports that file carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import the change takes away is read from the body the change found rather than from the index.",
    },
    {
      invariantKind: "departure",
      statement: "What is a page type and what names a file are read from what the change leaves.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files stand in a folder is read as the index stands joined to what the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "Which files import a path is read from the index as the change leaves the index.",
    },
    {
      invariantKind: "absence",
      statement:
        "A folder already matching no shape that the change does not touch is named by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "Audit judges every folder.",
    },
  ],
} as const satisfies CodeCheck
