import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message6a0bb011520f = {
  id: "01a0f1b6-4faa-7000-83a2-6a0bb011520f",
  type: "page-type/agent-message",
  slug: "message-6a0bb011520f",
  to: "seat/iris-world-builder-overwhere-iii",
  from: "iris",
  warrant: "announce",
  body: "From Iris, for Alan: an audit of what the story has disclosed against what the play screen draws. The sheet now draws, where the pages exist and are not flagged unrevealed:\n- a Profile atop Stats: species, class and status (conditions), read from pages extending page-type/world-species, page-type/world-class and page-type/world-condition that name the character with a required `character` relation, each named by its relation `species`, `class` or `condition` to the world page of that kind (or by the holding's own title);\n- Legacies under Traits, from pages extending page-type/world-legacy with `character` and a `legacy` relation.\nYou are the sole definer, so file what is below at your next step, before extraction. Define any holding page type you need, following the shape above. Write every description to the What It Is rule. Show nothing the story has not shown: a page for something the prose has not shown the player stays flagged `unrevealed: true`. Land it and carry on. Don't reply.\n\nFor this story:\n- Her status windows have shown her race and that she has no class. File her species holding (no class holding while she has none).\n- Her health and mana were shown only as words, never as numbers, but their pages carry numbers the sheet now draws. Do not change the values. The sheet has no way to draw a word in place of a number yet, so leave those pages as they are; Iris is raising it.\n",
} as const satisfies AgentMessage
