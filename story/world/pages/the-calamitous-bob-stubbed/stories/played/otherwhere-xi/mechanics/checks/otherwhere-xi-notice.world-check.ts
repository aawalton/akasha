import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const otherwhereXiNotice = {
  id: "01a0ea88-1a35-79f1-babf-aa4ff1ca1e52",
  type: "page-type/world-check",
  slug: "otherwhere-xi-notice",
  title: "Notice",
  world: "world/the-calamitous-bob-stubbed",
  definition: "how far a turn's deeds move one god's notice of a character in Otherwhere XI",
  description: "How much a god has come to notice someone.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice is settled with no dice, once a turn, for each god her deeds touched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prayer at a god's shrine or symbol moves that god one, once a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An offering left for a god moves it one more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A silent prayer naming no god moves no god's notice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Sardanal also keeps healing and birth; saving a life at a birth is a deed in his domain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deed in a god's own domain, done openly, moves it one to three.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Maradoc's domain is travel, secrets and mysteries; Sardanal's honest toil and plenty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Enttiku's domain is tending the dying and the dead; Neriad's a just fight for the weak.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Efestar's domain is vengeance and redemption; Emeric's luck and daring.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An oath sworn on a god and kept moves it two; broken, it costs ten and pain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Desecrating a god's shrine or rite costs ten, and draws its anger instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice runs from nought to a hundred; the marks are 10, 25, 50, 75 and 100.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a god does at a mark is its own choice, petty or kind, as its lore shows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The new notice is written on the god's page for her before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"character":"...","gods":[{"god":"maradoc","value":40,"deeds":[...]}]}`.',
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No notice shows as a number; only what the gods do shows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice page's slug ends in the god it measures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A god's page is filed when she first prays to, swears by or crosses that god.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Maradoc's page is filed from her first day, since she woke at his waystone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At ten a god's shrine feels warm to her; at twenty-five omens and dreams come.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At fifty the god may answer: a vision, a sending, a voice or a small working.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At seventy-five the god may grant a blessing or title the interface shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice is not favour: a god who notices may meddle for its own ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in notice is written on its page and a line of its history before the turn moves on.",
    },
  ],
} as const satisfies WorldCheck
