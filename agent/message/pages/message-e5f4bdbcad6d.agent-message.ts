import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageE5f4bdbcad6d = {
  id: "01a106fa-199e-7000-95d2-e5f4bdbcad6d",
  type: "page-type/agent-message",
  slug: "message-e5f4bdbcad6d",
  to: "seat/mari-story-recorder-fairweather-flex-4",
  from: "mari",
  warrant: "announce",
  body: 'Your picture instructions changed (commit ea7f4bb7): for a story stating picturesOnBeats, land each beat\'s picture on its beat as soon as it is made, so Alan sees it in the draft. Write the picture as one json line to /var/tmp/akasha-turn-pictures/<chapter slug>-<n>.jsonl, as {"beat": n, "cover": "image/<slug>", "coverAfter": "<first twelve or so words of the beat\'s prose>", "place": "place/<slug>", "characters": ["character-other/<slug>"]}, then run alone on its line: akasha story turn picture --chapter <chapter slug> --pictured-file <that file>. It sets the beat\'s pictured and the chapter\'s scenes and lands at once. Now: put every chapter 5 picture you have already made into one file, one line per beat, and land them the same way with one call. From here on land each remaining picture right after its edit. When every beat is pictured, draft only cover onto the chapter page and advance with no --pictured-file, so nothing already landed is handed in again. Re-read story/recorder/pages/picture.story-recorder.instructions.md first.\n',
} as const satisfies AgentMessage
