import type { Module } from "@akasha/code/module"

export const drafting = {
  id: "01a06315-8aa2-7993-a0d0-9ec51066ecaf",
  pageTypeSlug: "module",
  slug: "drafting",
  definition: "the change an agent drafts into its patch rather than onto the tree",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change drafted is folded into the patch the agent already has.",
    },
    {
      invariantKind: "departure",
      statement: "A body is carried as the bytes that body is rather than as text.",
    },
    {
      invariantKind: "departure",
      statement: "The patch is rebased onto the commit at HEAD before a change is folded in.",
    },
    {
      invariantKind: "departure",
      statement: "One rule rebases bodies onto a commit.",
    },
    {
      invariantKind: "departure",
      statement: "A caller with bodies that came from no patch reaches that rule directly.",
    },
    {
      invariantKind: "departure",
      statement: "A rebase says which paths moved between the patch's base and the commit at HEAD.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path moved is a path whose body at HEAD is not the body the patch was built on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the commit at HEAD has nothing at is followed to the path a rename left that body at.",
    },
    {
      invariantKind: "departure",
      statement: "A path followed through a rename is followed again through the next rename.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body drafted at a path renamed away is merged onto the body at the path the rename left.",
    },
    {
      invariantKind: "departure",
      statement: "A path taken away by no rename is carried into the patch as a conflict.",
    },
    {
      invariantKind: "departure",
      statement: "A conflict left by a path taken away marks the body the patch held at that path.",
    },
    {
      invariantKind: "departure",
      statement: "A body spelling no text at a path taken away refuses the rebase.",
    },
    {
      invariantKind: "departure",
      statement: "A rename reaching a path the patch already has a body at refuses the rebase.",
    },
    {
      invariantKind: "departure",
      statement: "A body that moved under a draft is merged rather than overwritten.",
    },
    {
      invariantKind: "departure",
      statement: "The body a change was composed against is what the merge reads as its base.",
    },
    {
      invariantKind: "departure",
      statement: "A change against a path the patch does not have is drafted whole.",
    },
    {
      invariantKind: "departure",
      statement: "A change against a path the patch has is merged onto the body drafted there.",
    },
    {
      invariantKind: "departure",
      statement: "A path drafted onto twice keeps the body the patch was already built on.",
    },
    {
      invariantKind: "departure",
      statement: "A change leaving what HEAD has takes nothing back out of the patch.",
    },
    {
      invariantKind: "departure",
      statement: "A line conflict is drafted into the patch as the body git marked.",
    },
    {
      invariantKind: "departure",
      statement: "A conflict that is no line conflict refuses the draft.",
    },
    {
      invariantKind: "departure",
      statement: "A draft refused leaves the patch unchanged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A draft answers the bodies that draft leaves beside the patch drawing the bodies.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body answered carries as its base the body the drafting change was worked out from.",
    },
    {
      invariantKind: "departure",
      statement: "The patch carries as its base the body the commit at HEAD holds instead.",
    },
    {
      invariantKind: "departure",
      statement: "A landing handed the bodies merges from the base the drafting change read.",
    },
    {
      invariantKind: "departure",
      statement: "A draft says which paths the patch has a conflict at.",
    },
    {
      invariantKind: "departure",
      statement: "A path carrying a conflict from an earlier draft is named again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body resolved replaces the body drafted at that path rather than merging onto that body.",
    },
    {
      invariantKind: "departure",
      statement: "A body is resolved after the patch is rebased onto the commit at HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "A path the patch has no body at is refused rather than drafted whole.",
    },
    {
      invariantKind: "departure",
      statement: "A patch a path is taken out of still has every other path.",
    },
    {
      invariantKind: "departure",
      statement: "A path is taken out after the patch is rebased onto the commit at HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "Taking the last path out takes the patch away.",
    },
    {
      invariantKind: "departure",
      statement: "Taking out a path the patch has no body at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A patch is read and written again under the turn the patch's file keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A drafted body reaching what HEAD holds leaves the patch.",
    },
    {
      invariantKind: "departure",
      statement: "A patch left with nothing is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "The blobs a patch names are kept before the patch is written.",
    },
    {
      invariantKind: "departure",
      statement: "A ref keeping blobs is taken away with the patch that names those blobs.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is no page is refused rather than drafted.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies a patch would have are answered without the patch being written.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies a patch would have are the bodies of that patch rebased with the draft folded in.",
    },
    {
      invariantKind: "departure",
      statement: "A path the patch has is answered whether or not the draft names that path.",
    },
    {
      invariantKind: "departure",
      statement: "One agent's patch is folded into another's by the merge a draft is folded by.",
    },
    {
      invariantKind: "departure",
      statement:
        "A patch coming in is rebased onto the commit at HEAD before that patch is folded.",
    },
    {
      invariantKind: "departure",
      statement: "A path both patches have is merged rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "A patch taken in goes.",
    },
    {
      invariantKind: "departure",
      statement: "The ref keeping the blobs of a patch taken in goes with that patch.",
    },
    {
      invariantKind: "departure",
      statement: "The patch taking a blob in keeps that blob before the ref goes.",
    },
    {
      invariantKind: "departure",
      statement: "A take-in from an agent keeping no patch leaves the patch as that patch was.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into the worktree.",
    },
    {
      invariantKind: "departure",
      statement: "A patch file written or taken away is committed.",
    },
    {
      invariantKind: "departure",
      statement: "The commit message says whether the patch file was written or taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A patch file is committed under the hold a landing takes.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that will not land leaves the draft as the draft is.",
    },
    {
      invariantKind: "departure",
      statement: "A patch is put back as the bytes a caller held rather than worked out again.",
    },
    {
      invariantKind: "departure",
      statement: "The blobs the bytes put back name are kept again with those bytes.",
    },
    {
      invariantKind: "departure",
      statement: "Putting a patch back is committed as writing that patch is committed.",
    },
    {
      invariantKind: "departure",
      statement: "Putting back no patch takes the patch away.",
    },
    {
      invariantKind: "absence",
      statement: "No check judges the body of a patch file.",
    },
    {
      invariantKind: "departure",
      statement: "A patch carries whether the checks run on its changes.",
    },
    {
      invariantKind: "departure",
      statement: "A patch carries whether its writer owes reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "A patch carries whether the readers of each path the patch holds owe reading again.",
    },
    {
      invariantKind: "departure",
      statement: "A path whose readers owe no reading is one line before the first diff header.",
    },
    {
      invariantKind: "departure",
      statement: "That line names the flag and the path.",
    },
    {
      invariantKind: "departure",
      statement: "A path no such line names leaves its readers owing the reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "A draft saying nothing about its readers takes the answer the change drafted in gives.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path drafted into twice leaves its readers owing the reading where either draft did.",
    },
    {
      invariantKind: "departure",
      statement: "A body resolved leaves its readers owing the reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checks a change kind runs and the readings that kind owes become a patch's flags.",
    },
    {
      invariantKind: "departure",
      statement: "A call with no change kind runs every check and owes every reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "A patch runs the checks and owes the reading of every change drafted into that patch.",
    },
    {
      invariantKind: "departure",
      statement: "Each flag a patch has is unioned on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A change drafted takes away nothing an earlier change made the patch run.",
    },
    {
      invariantKind: "departure",
      statement: "A resolve runs the checks and owes the reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path taken out leaves the patch running the checks and owing the reading that patch did.",
    },
    {
      invariantKind: "departure",
      statement: "A patch taking another in runs the checks and owes the reading both patches did.",
    },
    {
      invariantKind: "departure",
      statement: "A flag that is false is one line before the first diff header naming that flag.",
    },
    {
      invariantKind: "departure",
      statement: "A flag no line names is true.",
    },
    {
      invariantKind: "stopgap",
      statement: "A patch drafted before the flag was renamed is read under the old spelling too.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "A patch drafted before the flag named a path is read as naming every path that patch has.",
    },
  ],
} as const satisfies Module
