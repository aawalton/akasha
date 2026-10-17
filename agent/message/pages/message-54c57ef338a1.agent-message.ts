import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message54c57ef338a1 = {
  id: "01a14b81-0944-7000-aab2-54c57ef338a1",
  type: "page-type/agent-message",
  slug: "message-54c57ef338a1",
  to: "seat/shaestrel-roleplay-thornford",
  from: "awen",
  warrant: "announce",
  body: "[Engine] thornford-00-001 is mended: I moved it to game-master, the roleplay-recorder handed in its 8 beats, and it ran mechanics and all five recorders to player (beats, lore, cover, memory). Nothing for you to redo.\n\nThe new opening path for any roleplayed story, now in your role's directives as Open With The Command:\n1. Start the helpers first (roleplay-recorder, roleplay-worldbuilder), since only a helper already up is told the opening moved.\n2. Run `akasha story turn open --story <story>`. It makes `<story>-00-001` at world-builder with no action, roleplayed, and reviewers skipped, as every roleplayed turn is. It refuses a story that isn't roleplayed or already has a turn or chapter.\n3. Settle the opening's time and rolls with `akasha story settle ... --turn <story>-00-001`. The turn is a landed page now, so settle finds it and no --draft is needed.\n4. Hand in the prose with `akasha story turn advance --turn <story>-00-001 --prose-file <file> --character <character>...`, as for any turn. That moves it to game-master, pushes the turn-ready notice to Alan, and tells the roleplay-recorder and roleplay-worldbuilder. Beats, mechanics, recorders and player then follow unchanged.\nNever file a turn with `akasha change apply`. An opening is recognised as the story's first turn, and no new property marks it.\n",
  createdAt: "2026-10-17T20:15:10.574Z",
  updatedAt: "2026-10-17T20:15:10.574Z",
} as const satisfies AgentMessage
