import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const keepingMyWord = {
  id: "01a06559-9d65-7ebe-bb54-20fccae82a51",
  type: "page-type/all-about-alan-topic",
  slug: "keeping-my-word",
  title: "Keeping My Word",
  definition: "why a commitment of mine never fails without my saying so first",
  parents: ["all-about-alan-topic/why-i-have-to-be-perfect"],
  settled:
    "I either do what I committed to or I openly renegotiate it with the person I committed to. Failing is allowed if it is spoken. The silence is the part that is off the table.\n\nFailure is incredibly painful and expensive. Keeping a commitment costs less than renegotiating it, and renegotiating costs less than failing.\n\nThe currency of failure is stress capacity rather than worth. This is accounting under scarcity, not an honour code.\n\nI have spent so much time underwater, and failure has cost so much, that generalising rules around commitments to head off future costs is the rational thing for me to have done.\n\nIt is a governor of the same family as taking no deadlines and refusing responsibility.\n\nThree sayings carry the compressed version: the only way out is through, a man is only worth as much as his word, and doing it is easier than not doing it.",
} as const satisfies AllAboutAlanTopic
