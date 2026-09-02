import type { Finding } from "../finding.page-type.ts"

export const theReaderThrowsAwayTheReasonAGameRefused = {
  id: "01a062a2-a8f5-7c7c-a631-3fd86d81f0f1",
  pageTypeSlug: "finding",
  slug: "the-reader-throws-away-the-reason-a-game-refused",
  domainSlug: "domain/story-engine",
  claim:
    "The server half of the reader says gone out loud and the client half draws it as empty. `loadGame` throws an `unheld()` message naming the game it cannot answer for, and the one reader that still runs catches every failure with a bare `catch`, keeps no reason, and renders the host app's generic fallback. A player in the native shell sees a page with nothing on it and no word that the reader refused.",
  evidence:
    '`alanwalton/web/app/awen/components/awen-remote-reader.tsx` lines 28 to 38 fetch `/api/awen-game/${externalId}`, throw on a non-2xx, parse on success, and close with `catch { if (alive) setState({ status: "error" }) }`. The reason reaches the catch and goes no further; line 53 answers `<>{fallback}</>`, and the fallback is the host app\'s generic body rather than anything the story engine said.\n\nThe route it calls, `alanwalton/web/app/routes/api.awen-game.$externalId.ts`, reaches `loadGame`, and `alanwalton/web/app/awen/lib/game.server.ts` line 29 is `throw new Error(unheld(AWEN_GAME_SLUG, ...))`. That message was written to be read: `alanwalton/web/app/lib/pages-unheld.ts` carries the doctrine that gone is said out loud rather than drawn as empty. The server obeys it and the client undoes it at the boundary between them.\n\nThis is the only reader path a player can reach today. The server-rendered mount is unreachable: `page-detail-loader.server.ts` reaches `loadAwenGame`, which reaches the same throwing `loadGame`, so `loaderData.kind === "awen-game"` is never true and the reader never renders. The native shell mount does run, always lands in the catch, and always answers the fallback.\n\nRead 2 September while migrating the reader into `@akasha/story-ui`. The file is recommended to remain app-side, so this is filed rather than fixed here.',
} as const satisfies Finding
