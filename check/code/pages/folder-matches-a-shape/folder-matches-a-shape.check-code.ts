import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const folderMatchesAShape = {
  id: "01a04e33-f281-7900-a29d-0b79e444ca98",
  type: "page-type/check-code",
  slug: "folder-matches-a-shape",
  definition: "the check refusing a folder matching none of the folder shapes",
  parts: [
    "module/collection-parts",
    "module/folder-grouping",
    "module/folder-naming",
    "module/one-page-only",
    "module/one-type-only",
    "module/plural-gathering",
    "module/shape-loading",
    "page-type/folder-shape",
  ],
  runsOnChange: true,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder matching any shape is right.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder's name never opens with the slug of the page above that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder opening with that name is refused whatever shape the folder would match.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal is answered before any shape is asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name a folder is asked for is its page's own with that opening taken off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The name a folder is asked for is never a name opening with the name the page above that folder has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder is asked for no name where taking that opening off leaves nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape says so rather than asking for a name that folder would be refused for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder named for a part rather than for a page is asked for no such name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder sitting under a part is named against the page above that part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every part between the folder and that page is looked through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder named as an enabled shape's own name is a part of the page above that folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Those names are derived from the enabled shapes and the page types' plurals rather than named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a folder is judged of its own by the shape whose name that folder takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Passing such a folder over as a part loses no judgement.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder named by the one page in that folder is that page's own folder rather than a part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a part is looked through when the page above a folder is looked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal has each shape's reasons rather than ranking those shapes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A reach spelled as the name a manifest states reaches into the folder that reach lands in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Those manifests are read as the change leaves those manifests.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every folder above a changed path is judged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A folder the change reaches no path inside is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder under a judged folder is judged only where the change reaches inside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The workspace root is judged by every change with a path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A shape reads the folders under a folder as well as the files sitting in the folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An import the change adds or takes away is judged at the folder the import reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import inside a folder is no entrance to the folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a TypeScript file is read for the imports that file has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An import the change takes away is read from the body the change found rather than from the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which slugs are page types and which slugs name a file are read from the index the change leaves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which files sit in a folder is read as what git carries joined to the paths the change has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What git carries is read at the commit the change is judged against.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path another landing first carried after that commit sits in no folder here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which files import a path is read from the index as the change leaves the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A folder already matching no shape that the change does not touch is named by nothing here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Audit judges every folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page this check has in hand is read from the index by that page's path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder holding nothing but files some page's property names is no folder of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The files such a folder holds are judged where the page declaring those files is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder holding a subfolder is a folder of its own whatever else that folder holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That folder is passed over before any shape is asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Those segments are derived from the file properties rather than named in this check.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder looked through to find the page above is judged all the same.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Alan approved this check in the turn asking for it to judge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit pays its reach once a run, so audit is given the longer ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder a change leaves holding no file and no folder is judged by no shape.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file a generator writes shapes no folder, so no shape is shown that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a file beside a page leaves that page in the folder that page sat in.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 45 },
} as const satisfies CheckCode
