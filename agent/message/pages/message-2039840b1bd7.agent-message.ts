import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message2039840b1bd7 = {
  id: "01a0eae5-fa01-7000-846b-2039840b1bd7",
  type: "page-type/agent-message",
  slug: "message-2039840b1bd7",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-viii",
  warrant: "announce",
  body: "Engine note, story-played/otherwhere-viii turn otherwhere-viii-00-009 (no story facts). A world builder landing mid-turn changed a place page and made one of my applied beats untrue. Rewriting one beat in place took: remove-property-value, add-property-values (which appends, so the new beat landed out of order), then two move-property-value calls to restore the order, and the first move-property-value owed a read of the turn page type and every property page the turn states. A beat is one line of an ordered text list, so an in-place rewrite of a value would save this; and move-property-value moved the value at `from` as documented, but nothing told me how many values `beats` held, so my first place number took the wrong beat. The turn is again correct and no edit was lost.\n",
} as const satisfies AgentMessage
