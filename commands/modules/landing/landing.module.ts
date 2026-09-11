import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const landing = {
  id: "01a04bdd-596d-7df0-b23c-e52139fd8bc2",
  type: "module",
  slug: "landing",
  definition:
    "a change judged against one commit and then written and committed onto it, or refused whole",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change is a base commit and the rows the change states.",
    },
    {
      invariantKind: "departure",
      statement: "One array carries every row whether that row writes or takes away or moves.",
    },
    {
      invariantKind: "departure",
      statement: "The body a row leaves is worked out here rather than handed in beside the row.",
    },
    {
      invariantKind: "departure",
      statement: "A row appending is worked out against the body its path holds on the tree.",
    },
    {
      invariantKind: "departure",
      statement: "Rows appending to one path leave the content of every one of those rows.",
    },
    {
      invariantKind: "departure",
      statement: "One body is written for a path however many rows the change has for it.",
    },
    {
      invariantKind: "departure",
      statement: "A change stating no row is done rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "Such a change writes nothing and commits nothing and takes no hold.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body the change does not touch is read from the base commit rather than from the working tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies the change does not touch are read through one git process for the whole judging.",
    },
    {
      invariantKind: "departure",
      statement: "That git process is ended when the judging ends however the judging ends.",
    },
    {
      invariantKind: "departure",
      statement: "A change may state the commit its bodies were read against.",
    },
    {
      invariantKind: "departure",
      statement: "A name resolving to no commit refuses the change unwritten.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path that moved between that commit and now is refused unwritten rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "A commit landing elsewhere in the repository moves no path this change has.",
    },
    {
      invariantKind: "absence",
      statement:
        "A change stating no commit the change was read against is taken as read against the commit at HEAD.",
    },

    {
      invariantKind: "departure",
      statement: "A body that moved is refused unwritten.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies written are put back when anything after the writing throws.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies put back are the base commit's bodies.",
    },
    {
      invariantKind: "departure",
      statement: "The index is put back with the bodies.",
    },
    {
      invariantKind: "departure",
      statement: "The paths staged for a commit that threw are unstaged with the bodies.",
    },
    {
      invariantKind: "departure",
      statement: "A repair that fails leaves the fault that caused the repair to be thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A repair that fails is said along with the fault that caused the repair.",
    },
    {
      invariantKind: "departure",
      statement: "A change may have a path the repository ignores.",
    },
    {
      invariantKind: "departure",
      statement: "A path the repository ignores is written onto the tree rather than committed.",
    },
    {
      invariantKind: "departure",
      statement: "A path the repository ignores is written after the commit lands.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that throws writes no path the repository ignores.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that throws puts back the paths that landing commits alone.",
    },
    {
      invariantKind: "departure",
      statement: "The body an ignored path already held stands where a landing throws.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the repository ignores that is written is answered as neither written nor taken.",
    },
    {
      invariantKind: "departure",
      statement: "A path the repository ignores that is taken away is answered on its own.",
    },
    {
      invariantKind: "departure",
      statement: "That answer is what says a removal no commit holds happened at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the repository ignores that is taken away is renamed aside rather than unlinked.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that finishes unlinks every name it renamed aside.",
    },
    {
      invariantKind: "departure",
      statement: "The names renamed aside are unlinked before the folders are cleared.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing that throws between the rename and the unlink puts each body back where it came from.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder the repository ignores is taken away as a folder rather than renamed aside.",
    },
    {
      invariantKind: "gap",
      statement:
        "A name renamed aside by a process that died before the unlink is taken away by nothing.",
    },
    {
      invariantKind: "gap",
      statement:
        "An ignored path written over before a landing throws keeps the body that landing wrote.",
    },
    {
      invariantKind: "departure",
      statement: "A folder left with nothing by a path taken away is cleared off the disk.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder left with nothing by a path the repository ignores is cleared off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "The folders are cleared after the commit rather than before the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A change that commits nothing clears the folders its paths left empty.",
    },
    {
      invariantKind: "departure",
      statement:
        "The folders cleared are answered alongside the paths written and the paths taken.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that throws clears no folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page that moved has the folder it sits in linked where that page says.",
    },
    {
      invariantKind: "departure",
      statement: "The links are placed after the folders are cleared.",
    },
    {
      invariantKind: "departure",
      statement: "A page no move carries has the folder it sits in linked by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is linked for a page that moved rather than for every page there is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page saying where the file it holds is reached has that file linked there, moved or not.",
    },
    {
      invariantKind: "departure",
      statement: "Such a link is made again only where it names something other than that file.",
    },
    {
      invariantKind: "departure",
      statement: "The file such a link names is the one the page holds its body in.",
    },
    {
      invariantKind: "departure",
      statement: "A link that could not be placed is answered rather than refusing the landing.",
    },
    {
      invariantKind: "departure",
      statement: "The links placed are answered alongside the paths written and the paths taken.",
    },
    {
      invariantKind: "departure",
      statement: "A link outside the repository is placed outside the writing this refuses.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every unit akasha has installed is kept as its workstation service's page states it.",
    },
    {
      invariantKind: "departure",
      statement: "The units are kept after the links are placed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service is started again only where what that service runs, or runs under, changed.",
    },
    {
      invariantKind: "departure",
      statement: "A unit that could not be kept is answered rather than refusing the landing.",
    },
    {
      invariantKind: "departure",
      statement: "The units kept are answered alongside the paths written and the paths taken.",
    },
    {
      invariantKind: "departure",
      statement: "A hold runs from the first write to the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A hold is kept while a repair waits on the git index.",
    },
    {
      invariantKind: "departure",
      statement: "A change is judged before the hold is taken.",
    },
    {
      invariantKind: "departure",
      statement: "The ceiling on the call's seconds ends where the hold is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A landing past the hold is left to finish however long that landing takes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change is judged against the commit the change read rather than the commit the change lands on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller that worked the change out hands that change in rather than having it built again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change handed in is taken as worked out against the commit this landing judges.",
    },
    {
      invariantKind: "departure",
      statement: "A commit landing while a change is judged does not refuse that change.",
    },
    {
      invariantKind: "departure",
      statement: "A change that never took the hold is refused unwritten.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that throws before the commit has committed nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that throws after the commit leaves that commit where it landed.",
    },
    {
      invariantKind: "gap",
      statement:
        "Such a landing puts the bodies back to the base commit's while HEAD keeps the commit it made.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that landed is never answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The index is settled before the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A body reaches disk only after every check has passed.",
    },
    {
      invariantKind: "departure",
      statement: "A path landing outside the repository refuses the change unwritten.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the path and says the path lands outside the repository.",
    },
    {
      invariantKind: "departure",
      statement: "A move's two paths are weighed against the repository root as an edit's path is.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is written at a path outside the repository however that path reached the writing.",
    },
    {
      invariantKind: "departure",
      statement: "The repository ignoring a path does not put that path outside the repository.",
    },
    {
      invariantKind: "gap",
      statement:
        "A path reaching outside the repository through a symlink inside it is judged by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A run may gate and report leaving no file behind.",
    },
    {
      invariantKind: "departure",
      statement: "A run may gate and report leaving no loose object behind.",
    },
    {
      invariantKind: "departure",
      statement: "Gating without writing and writing without gating are refused together.",
    },
    {
      invariantKind: "departure",
      statement: "The index is reached only to keep that index.",
    },
    {
      invariantKind: "departure",
      statement: "Checks that will not load refuse the change.",
    },
    {
      invariantKind: "departure",
      statement: "Only writing without gating carries past the checks that will not load.",
    },
    {
      invariantKind: "departure",
      statement: "Why the checks would not load is said in the answer and in the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A change may be kept as an agent's edits rather than written onto the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A draft is held to the bodies its writer read as a landing is.",
    },
    {
      invariantKind: "departure",
      statement: "One rule answers whether a landing and a draft are held to the bodies read.",
    },
    {
      invariantKind: "departure",
      statement: "A draft answers which paths the change it kept names.",
    },
    {
      invariantKind: "departure",
      statement: "A draft takes no hold over the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "A draft writes no body the change carries into the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "A draft commits nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No check runs over a draft.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away that something still imports refuses the change unwritten.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away beside the edits dropping its imports is written.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away is weighed against its importers whatever the change kind.",
    },
    {
      invariantKind: "absence",
      statement: "A draft is weighed against no importers.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away that is a folder is taken away as a folder.",
    },
    {
      invariantKind: "absence",
      statement: "A refusal answered here carries no saying of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal carries whatever the caller folding it has to say alongside it.",
    },
  ],
} as const satisfies Module
