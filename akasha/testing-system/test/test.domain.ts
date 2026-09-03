import type { Domain } from "@akasha/domain-system/domain"

export const test = {
  id: "01a04f3e-eea5-79ee-8d0b-c822c492a981",
  pageTypeSlug: "domain",
  slug: "test",
  definition: "a run holding code to what its page says of it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test names one thing held true.",
    },
    {
      invariantKind: "departure",
      statement: "A test over invented data proves what the fixture holds.",
    },
    {
      invariantKind: "departure",
      statement: "A test over the pages proves what the pages hold.",
    },
    {
      invariantKind: "departure",
      statement: "Neither test stands for the other.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test reaching the pages reads the pages whole rather than pinning what the test found.",
    },
    {
      invariantKind: "gap",
      statement: "A test that would pass over an empty world does not land.",
    },
    {
      invariantKind: "constraint",
      statement: "The DOM shim a test runs in drops `set-cookie` from a `Response`.",
    },
    {
      invariantKind: "constraint",
      statement: "The runtime that DOM shim answers for keeps `set-cookie` on a `Response`.",
    },
    {
      invariantKind: "constraint",
      statement: "`mock.restore()` leaves a `mock.module` replacement in place.",
    },
    {
      invariantKind: "constraint",
      statement: "Mocking a module mutates that module's namespace object in place.",
    },
    {
      invariantKind: "constraint",
      statement: "A reference taken before a mock holds the stub rather than the original.",
    },
    {
      invariantKind: "constraint",
      statement: "A `beforeAll` is charged against the same time bound as a test case.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Nothing Cheaper Catches It",
      act: "Keep a test only where it would catch a defect nothing cheaper would.",
      warrant:
        "A defect something cheaper catches never reaches the suite, so the test cannot fire.",
      aids: [
        "Cheaper means it refuses sooner: a type, a check.",
        "Keep it until the cheaper one is really there.",
      ],
    },
    {
      directiveKind: "principle",
      name: "Assert The Invariant",
      act: "Assert an invariant a page states, never a detail of the case at hand.",
      warrant:
        "An assertion about one case breaks while nothing is wrong, and its repair checks nothing.",
      aids: ["Where no page states it, settle it with Alan.", "Stable so far is not an invariant."],
    },
    {
      directiveKind: "principle",
      name: "Write For The Next Change",
      act: "Write a test for what a later change could break, never to confirm the one that wrote it.",
      warrant:
        "A test pays only on runs after the change that wrote it, so confirming that change buys nothing.",
      aids: [
        "Test new code too, not just code being changed.",
        "Aim at what a stranger could break.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Delete It Now",
      act: "Delete a test the moment the structure makes the defect it catches impossible.",
      warrant:
        "You are the last reader who can tell it went redundant; afterwards it reads as a test that passes.",
      aids: [
        "Delete on impossible, never on unlikely.",
        "Delete only the case that went redundant.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Delete Rather Than Repair",
      act: "Delete a test that fails while nothing is wrong; never repair it.",
      warrant:
        "A repair is confirmed by the failure not returning, which is what the fault looked like.",
      aids: [
        "A retry or a skip is still a repair.",
        "Settle that the code is right before you delete.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Never Ask The Code",
      act: "Work out a test's expected value yourself, never by running the code under test.",
      warrant:
        "A value computed the way the code computes it agrees by construction: green on every input.",
      aids: [
        "A helper or fixture the code uses is the code.",
        "Approving a generated snapshot is asking the code.",
      ],
    },
    {
      directiveKind: "rule",
      name: "Green Or Gone",
      act: "Fix or delete a failing test before moving a change forward, whoever caused the failure.",
      warrant:
        "Knowing who broke it removes the duty, never the failure, so the red outlives everyone who saw it.",
      aids: [
        "Loosening a test until it passes is not a fix.",
        "Delete only a test that no longer earns its place.",
      ],
    },
  ],
} as const satisfies Domain
