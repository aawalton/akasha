import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXSuspicion = {
  id: "01a0ea74-df5e-71c0-9b9b-9fa1f7d0db3c",
  type: "page-type/world-check",
  slug: "otherwhere-x-suspicion",
  title: "Suspicion",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  definition: "how far a turn in Otherwhere X raised or eased the district's suspicion of Nala",
  description: "How far the folk and soldiers around Nala suspect her.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Suspicion is settled once a turn in which anyone with a say takes a look at her.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Anyone with a say is a reeve, a soldier, a warden, a magistrate, or villagers who talk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her suspicion page holds one count for the district she is in, from nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "No road token raises it two, strange clothes one, no home or kin she can name one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Being alone and too calm raises two, and being found near the surge two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Being heard speaking or singing in a tongue other than the common one raises two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Being seen to wear Nala Pike's face raises three, and a lie found out three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fleeing or fighting those with a say raises four, and refusing the tablet six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark raises it only in the turn it is first seen by those with a say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A local who vouches eases two, a day's honest work seen one, open answers one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gaining a road token eases three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tablet reading that clears her ends all suspicion at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Suspicion runs from nought to twenty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Under 3 she is unremarked; to 5 she is questioned; to 9 she is watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "From 10 she is held for a tablet reading; from 14 she is seized in irons.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Watched, she is followed, turned from work, and reported to Tarrant Ford.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Suspicion eases one on its own for each full week she gives no fresh cause.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change is added to her suspicion page in the same landing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rolls the dice.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No suspicion shows as a number, in the prose or on the play screen.",
    },
  ],
} as const satisfies WorldCheck
