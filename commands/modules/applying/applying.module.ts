import type { Module } from "@akasha/code/module"

export const applying = {
  id: "01a0644c-3f10-7a2e-9c31-6b0e5d4a7f21",
  pageTypeSlug: "module",
  slug: "applying",
  definition: "the bodies an agent has answered landed onto the tree as one commit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The arguments an apply takes are read here rather than by the command naming the apply.",
    },
    {
      invariantKind: "departure",
      statement: "The report an apply answers with is shaped here.",
    },
    {
      invariantKind: "departure",
      statement: "The message saying no patch is kept is worded here rather than by a command.",
    },
    {
      invariantKind: "departure",
      statement: "An apply given no message says the act and the paths that apply lands.",
    },
    {
      invariantKind: "departure",
      statement: "That message is composed by the rule every other landing composes by.",
    },
    {
      invariantKind: "absence",
      statement: "No apply commits a message describing nothing that apply landed.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies an apply lands are handed in.",
    },
    {
      invariantKind: "departure",
      statement: "An apply handed no bodies refuses rather than reading a patch off disk.",
    },
    {
      invariantKind: "departure",
      statement: "A patch is rebased onto the commit at HEAD before the patch is applied.",
    },
    {
      invariantKind: "departure",
      statement: "An apply stating no read is judged against the commit at HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "A read the caller states is judged against instead of the commit at HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "A read older than HEAD catches every move the commit at HEAD catches.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies the rebase leaves are what land.",
    },
    {
      invariantKind: "departure",
      statement: "A move the caller names is handed to the landing the apply makes.",
    },
    {
      invariantKind: "departure",
      statement: "A move the bodies handed in name is handed on beside the caller's moves.",
    },
    {
      invariantKind: "departure",
      statement: "A conflict refuses the apply and leaves the patch as the patch was.",
    },
    {
      invariantKind: "departure",
      statement: "A patch with a conflict does not apply.",
    },
    {
      invariantKind: "departure",
      statement: "A body with the marks a merge left is a body with a conflict.",
    },
    {
      invariantKind: "departure",
      statement: "Every path the patch has a conflict at is named in the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "An apply is judged by the gate as any other landing is judged.",
    },
    {
      invariantKind: "departure",
      statement: "An apply told to measure marks the run so the tests are held to no ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "That mark is taken off however the apply ended.",
    },
    {
      invariantKind: "departure",
      statement: "A measuring apply the gate cleared is refused, so a measure lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body the patch leaves is formatted before the gate judges that body.",
    },
    {
      invariantKind: "departure",
      statement: "A body the formatter moved is named in the answer.",
    },
    {
      invariantKind: "departure",
      statement: "An apply with a manifest has the lockfile those manifests warrant.",
    },
    {
      invariantKind: "departure",
      statement: "An apply writes a page type's worked type again as any other landing does.",
    },
    {
      invariantKind: "departure",
      statement:
        "An apply with a manifest installs the checkout onto the commit that apply landed.",
    },
    {
      invariantKind: "departure",
      statement:
        "An install the apply's tree would not take is answered as the landing road answers that install.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading is recorded of the body the formatter left rather than the body drafted.",
    },
    {
      invariantKind: "departure",
      statement: "A reading never ages out.",
    },
    {
      invariantKind: "departure",
      statement: "A wiped record leaves an apply unwarranted.",
    },
    {
      invariantKind: "departure",
      statement: "A path the patch's base and HEAD hold alike was read when that path was drafted.",
    },
    {
      invariantKind: "departure",
      statement: "A reading for a path that did not move is recorded again from the body at HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "A path that moved under the patch has no reading recorded for that path.",
    },
    {
      invariantKind: "departure",
      statement: "The warrant refuses a path that moved until the agent reads the body that moved.",
    },
    {
      invariantKind: "departure",
      statement: "A path the base commit did not have has no body to have been read.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is recorded before the gate runs.",
    },
    {
      invariantKind: "departure",
      statement: "An apply the gate refused leaves those readings recorded.",
    },
    {
      invariantKind: "departure",
      statement: "A body an apply lands is recorded as read by the agent that called the apply.",
    },
    {
      invariantKind: "departure",
      statement: "An agent is never left owing a read of the bodies that agent's own apply landed.",
    },
    {
      invariantKind: "departure",
      statement:
        "An apply whose patch owes its readers no reading carries their readings onto the bodies applied.",
    },
    {
      invariantKind: "departure",
      statement: "An apply whose patch owes its readers reading has no reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading is carried and dropped before the applying agent's own reading is recorded.",
    },
    {
      invariantKind: "gap",
      statement: "A path the patch renamed has the reading of the body that path came from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is applied where no bodies are handed in.",
    },
    {
      invariantKind: "departure",
      statement: "An apply over a patch that is mechanical runs no check.",
    },
    {
      invariantKind: "departure",
      statement: "Why no check ran is said in the commit only where the glass was broken.",
    },
    {
      invariantKind: "departure",
      statement: "An apply over a patch that is not mechanical is judged as any authored apply is.",
    },
    {
      invariantKind: "departure",
      statement: "Every refusal an apply answers with is written beside the calling agent's page.",
    },
    {
      invariantKind: "departure",
      statement: "A run replaces those refusals rather than appending to those refusals.",
    },
    {
      invariantKind: "departure",
      statement: "An apply that landed leaves no refusals beside that page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal set past what one answer has is answered as a pointer to that agent's file.",
    },
    {
      invariantKind: "departure",
      statement: "Where those refusals are written is worked out by the module keeping them.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes the hold.",
    },
  ],
} as const satisfies Module
