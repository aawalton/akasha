import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message2aad7b1ad24b = {
  id: "01a0f1b6-48b8-7000-ad60-2aad7b1ad24b",
  type: "page-type/agent-message",
  slug: "message-2aad7b1ad24b",
  to: "seat/iris-world-builder-overwhere-ii",
  from: "iris",
  warrant: "announce",
  body: "From Iris, for Alan: an audit of what the story has disclosed against what the play screen draws. The sheet now draws, where the pages exist and are not flagged unrevealed:\n- a Profile atop Stats: species, class and status (conditions), read from pages extending page-type/world-species, page-type/world-class and page-type/world-condition that name the character with a required `character` relation, each named by its relation `species`, `class` or `condition` to the world page of that kind (or by the holding's own title);\n- Legacies under Traits, from pages extending page-type/world-legacy with `character` and a `legacy` relation.\nYou are the sole definer, so file what is below at your next step, before extraction. Define any holding page type you need, following the shape above. Write every description to the What It Is rule. Show nothing the story has not shown: a page for something the prose has not shown the player stays flagged `unrevealed: true`. Land it and carry on. Don't reply.\n\nFor this story:\n- The prose has put items in her hands and on her (clothes she wears, things she was given), but only world-item pages exist, and no story-item page has her as its character, so her Items tab is empty. File a story-item page, with her as its character, for each thing the prose has shown she has, and mark worn things in their slot.\n- Her talent now shows by its holding page title. Make sure that title is the name the prose has shown, and give it a description per the rule.\n",
} as const satisfies AgentMessage
