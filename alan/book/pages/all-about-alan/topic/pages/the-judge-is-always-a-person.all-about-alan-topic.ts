import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theJudgeIsAlwaysAPerson = {
  id: "01a0c59f-6ca4-7de1-af01-04bc0b504613",
  type: "page-type/all-about-alan-topic",
  slug: "the-judge-is-always-a-person",
  title: "The Judge Is Always A Person",
  definition: "who does the judging that installs, in every room where it has happened",
  parents: ["all-about-alan-topic/why-i-have-to-be-perfect"],
  related: [
    "all-about-alan-topic/why-making-things-hurts",
    "all-about-alan-topic/how-god-reaches-me",
  ],
  settled:
    "All judgement reaches me through people. I carry no trigger at all from being judged by God directly.\n\nFor most people in my church the judging runs largely through what is felt before God, worthiness felt rather than reasoned. That channel is closed to me, since my believing sits downstream of my reasoning rather than of any feeling, so there is no felt verdict there to land on me.\n\nSo a judgement welded in at church could only ever come through the institution and the people in it: a leader across a desk, the congregation, the mission.\n\nFive rooms staked my survival: home, school, work, church and marriage. The room was never the variable. It only decides which person is the one I can neither walk away from nor overrule.\n\nThe judge I carry out of school is a teacher, but not one specific teacher. That judge has absorbed every teacher who marked me down because I could not figure out what they wanted.",
} as const satisfies AllAboutAlanTopic
