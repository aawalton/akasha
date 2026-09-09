import type { ChangeMechanicalFolder } from "../../change-mechanical-folder.page-type.ts"

export const moveFolder = {
  id: "01a0822c-5d57-7992-b533-fe3d7028ce8c",
  pageTypeSlug: "change-mechanical-folder",
  slug: "move-folder",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder",
  definition: "one folder and every file under it moved to another path",
  code: "ts",
  test: "ts",
  guards: [
    "change-guard/import-not-left-hanging",
    "change-guard/claimed-file-not-left-behind",
    "change-guard/folder-not-left-named",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every file under the folder is moved whether or not the index names it.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text is moved rather than refused.",
    },
    {
      invariantKind: "absence",
      statement: "No file outside the folder is moved.",
    },
    {
      invariantKind: "departure",
      statement: "A file keeps its place beneath the folder that file moved with.",
    },
    {
      invariantKind: "departure",
      statement: "A reach from one moved file to another is left as that reach is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body outside the folder naming a path that moved is repointed in the same answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body naming the folder rather than a whole path that moved is repointed by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming a path that moved names the path that path landed at.",
    },
    {
      invariantKind: "departure",
      statement: "Which manifests are read is answered by the index rather than by the tree.",
    },
    {
      invariantKind: "departure",
      statement: "The manifests read are the ones the world before the move names.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest carried with the folder is left to the ways in that manifest spells.",
    },
    {
      invariantKind: "departure",
      statement: "A way in keeps its key and takes the path that key's file landed at.",
    },
    {
      invariantKind: "departure",
      statement: "A key is the caller's entrance rather than the file's place.",
    },
    {
      invariantKind: "absence",
      statement: "No way in is renamed, no route running from a moved file to a package specifier.",
    },
    {
      invariantKind: "departure",
      statement: "A body the move writes still naming that folder refuses the move.",
    },
    {
      invariantKind: "departure",
      statement: "A folder already with a body at a path the move would write is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with no file is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder the index files as a page's own, holding a file under the folder moved, refuses the move.",
    },
    {
      invariantKind: "departure",
      statement: "Such a folder is taken away before the move rather than carried or emptied here.",
    },
    {
      invariantKind: "absence",
      statement: "No file this change carries none of is taken away by this change.",
    },
    {
      invariantKind: "departure",
      statement: "The listing carried is judged against the files git tracks under the folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file git tracks that the listing leaves out refuses the move and is named.",
    },
    {
      invariantKind: "departure",
      statement: "A file the listing names that git tracks nowhere is carried rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file git tracks that is off the disk already is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A repository git will not answer for refuses nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A folder moved under itself is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page moved with the folder keeps the slug that page had.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the data a page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "The imports, the pages' files and the folders emptied are judged by the guards here.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFolder
