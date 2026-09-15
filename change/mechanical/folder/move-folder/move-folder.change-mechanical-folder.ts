import type { ChangeMechanicalFolder } from "akasha/change/mechanical/folder/change-mechanical-folder.page-type.types.ts"

export const moveFolder = {
  id: "01a0822c-5d57-7992-b533-fe3d7028ce8c",
  type: "change-mechanical-folder",
  slug: "move-folder",
  changeMode: "change-mode/change-mode-move",
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
      invariantKind: "invariant-kind/departure",
      statement: "Every file under the folder is moved whether or not the index names it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that is not text is moved rather than refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No file outside the folder is moved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file keeps its place beneath the folder that file moved with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relative reach from one moved file to another is left as that reach is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body outside the folder naming a path that moved is repointed in the same answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body naming the folder that moved names the folder that folder landed at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What moved is handed down as the folder rather than as a path for each file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every file under the folder is answered for in one answer rather than one a file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is read as the world before the move holds that body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The module repointing a body is called rather than reached through a rung.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which bodies are read is answered by the last part of the folder's own name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bodies read are the ones a search of the tree names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree that could not be searched refuses rather than carrying nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that would not read names no folder here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reach such a body is left holding is judged by the guards rather than here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "No importer is asked of the index, because a body naming a path names the folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body the move writes still naming that folder refuses the move.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder already with a body at a path the move would write is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder with no file is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder a page claims holding a file under the folder moved refuses the move.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a folder is taken away before the move rather than carried or emptied here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No file this change carries none of is taken away by this change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The listing carried is judged against the files git tracks under the folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file git tracks that the listing leaves out refuses the move and is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the listing names that git tracks nowhere is carried rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file git tracks that is off the disk already is judged by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A repository git will not answer for refuses nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder moved under itself is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page moved with the folder keeps the slug that page had.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here changes the data a page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The imports and the pages' files and the folders emptied are judged by the guards here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generated body importing what moved is written by the generator.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that is not text spells no path that moved.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFolder
