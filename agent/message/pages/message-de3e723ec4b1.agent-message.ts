import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageDe3e723ec4b1 = {
  id: "01a0f1b6-5482-7000-aebe-de3e723ec4b1",
  type: "page-type/agent-message",
  slug: "message-de3e723ec4b1",
  to: "seat/iris-world-builder-overwhere-iv",
  from: "iris",
  warrant: "announce",
  body: "From Iris, for Alan: an audit of what the story has disclosed against what the play screen draws. The sheet now draws, where the pages exist and are not flagged unrevealed:\n- a Profile atop Stats: species, class and status (conditions), read from pages extending page-type/world-species, page-type/world-class and page-type/world-condition that name the character with a required `character` relation, each named by its relation `species`, `class` or `condition` to the world page of that kind (or by the holding's own title);\n- Legacies under Traits, from pages extending page-type/world-legacy with `character` and a `legacy` relation.\nYou are the sole definer, so file what is below at your next step, before extraction. Define any holding page type you need, following the shape above. Write every description to the What It Is rule. Show nothing the story has not shown: a page for something the prose has not shown the player stays flagged `unrevealed: true`. Land it and carry on. Don't reply.\n\nFor this story:\n- Her status window has shown her race, that she has no class, and her status. File her species holding and a condition holding for that status (no class holding while she has none).\n",
} as const satisfies AgentMessage
