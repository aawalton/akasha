import type { Module } from "@akasha/code/module"

export const landing = {
  id: "01a04bdd-596d-7df0-b23c-e52139fd8bc2",
  pageTypeSlug: "module",
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
      statement: "One array carries every row, whether that row writes, takes away or moves.",
    },
    {
      invariantKind: "departure",
      statement: "The body a row leaves is worked out here rather than handed in beside the row.",
    },
    {
      invariantKind: "departure",
      statement: "A change stating no row is done rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "Such a change writes nothing, commits nothing and takes no hold.",
    },
    {
      invariantKind: "departure",
      statement: "The rows a caller's bodies make are worked out here against a base commit.",
    },
    {
      invariantKind: "departure",
      statement: "A body spelling no text makes no row, and the caller is told which body.",
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
      statement: "A path the repository ignores is answered as neither written nor taken.",
    },
    {
      invariantKind: "departure",
      statement: "A folder left with nothing by a path taken away is cleared off the disk.",
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
      statement: "A landing that throws has committed nothing.",
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
      statement: "A change may be drafted into an agent's patch rather than written onto the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A draft is judged by the checks a landing is judged by.",
    },
    {
      invariantKind: "departure",
      statement:
        "A draft is judged against the bodies the patch would have rather than the change alone.",
    },
    {
      invariantKind: "departure",
      statement: "A path the patch has is judged whether or not the draft names that path.",
    },
    {
      invariantKind: "departure",
      statement: "A draft and an apply are judged over the same bodies.",
    },
    {
      invariantKind: "departure",
      statement: "The paths a draft was judged over are answered alongside the paths drafted.",
    },
    {
      invariantKind: "departure",
      statement: "A check refusing over a draft is answered rather than refusing the draft.",
    },
    {
      invariantKind: "departure",
      statement: "A draft a check refused is kept in the patch as a draft no check refused is.",
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
      statement: "A draft takes no hold over the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "A draft writes no body the change carries into the worktree.",
    },
    {
      invariantKind: "departure",
      statement: "A draft commits the patch rather than the bodies the change has.",
    },
    {
      invariantKind: "departure",
      statement: "A draft a conflict refused leaves the patch as the patch was.",
    },
    {
      invariantKind: "departure",
      statement: "A draft answers which paths the patch has a conflict at.",
    },
    {
      invariantKind: "departure",
      statement:
        "A draft says which checks the change drafted into the patch runs and the reading owed.",
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
  ],
} as const satisfies Module
