import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message91c13be2456f = {
  id: "01a0a3eb-d64e-7000-90e4-91c13be2456f",
  type: "message",
  slug: "message-91c13be2456f",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 4f05d29bd3197cf72e11a02e2affd89bd077e513 found 2 checks newly refusing.\n`domain-is-named-by-a-parent` refused 1 time:\n  infrastructure/storage/git-repo/repo/pages/code-editor-repo.repo.ts — 2 pages name `repo/code-editor-repo` among their parts — every page under `domain` but `domain/akasha` is a part of exactly one page above it\n`index-is-level-with-the-pages` refused 11 times:\n  seat/pages/alan/alan.seat.referenced-by — the index entry for this file is in the index differing from what its page says\n  mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.referenced-by — the index entry for this file is in the index differing from what its page says\n  mechanical/file/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.referenced-by — the index entry for this file is in the index differing from what its page says\n  mechanical/file/change-page-page-type/change-page-page-type.change-mechanical.referenced-by — the index entry for this file is in the index differing from what its page says\n  mechanical/folder/move-folder/move-folder.change-mechanical-folder.referenced-by — the index entry for this file is in the index differing from what its page says\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them answered, whole.\n",
} as const satisfies Message
