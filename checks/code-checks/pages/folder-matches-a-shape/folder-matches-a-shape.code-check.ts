import type { CodeCheck } from "../../code-check.page-type.ts"

export const folderMatchesAShape = {
  id: "01a04e33-f281-7900-a29d-0b79e444ca98",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "folder-matches-a-shape",
  definition: "the check refusing a folder matching none of the folder shapes",
  parts: [
    "module/folder-grouping",
    "module/folder-naming",
    "module/shape-loading",
    "page-type/folder-shape",
  ],
  code: "ts",
  test: "ts",
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
      statement:
        "The name a folder is asked for is never a name opening with what the page above it is named.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is asked for no name where taking that opening off leaves nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A shape says so rather than asking for a name that folder would be refused for.",
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
      statement:
        "A folder named as an enabled shape's own name is a part of the page above that folder.",
    },
    {
      invariantKind: "departure",
      statement: "Those names are derived from the enabled shapes rather than named in this check.",
    },
    {
      invariantKind: "departure",
      statement: "Such a folder is judged of its own by the shape whose name that folder takes.",
    },
    {
      invariantKind: "departure",
      statement: "Passing it over as a part loses no judgement.",
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
      statement: "The refusal has each shape's reasons rather than ranking those shapes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reach spelled as the name a manifest states reaches into the folder that reach lands in.",
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
      statement: "Every folder answering to a folder above a changed path is judged.",
    },
    {
      invariantKind: "departure",
      statement: "That folder is judged though the change has no path inside that folder.",
    },
    {
      invariantKind: "departure",
      statement: "The workspace root is judged by every change with a path.",
    },
    {
      invariantKind: "departure",
      statement: "No folder answers to the workspace root.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shape reads the folders under a folder as well as the files sitting in the folder.",
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
      statement: "Only a TypeScript file is read for the imports that file has.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import the change takes away is read from the body the change found rather than from the index.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which slugs are page types and which slugs name a file are read from the index the change leaves.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files sit in a folder is read as the index is joined to the paths the change has.",
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
    {
      invariantKind: "departure",
      statement: "A page this check has in hand is read from the index by that page's path.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder holding nothing but files some page's property names is no folder of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "The files such a folder holds are judged where the page declaring them is judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder holding a subfolder is a folder of its own whatever else that folder holds.",
    },
    {
      invariantKind: "departure",
      statement: "That folder is passed over before any shape is asked.",
    },
    {
      invariantKind: "departure",
      statement:
        "Those segments are derived from the file properties rather than named in this check.",
    },
    {
      invariantKind: "departure",
      statement: "A folder looked through to find the page above is judged all the same.",
    },
  ],
} as const satisfies CodeCheck
