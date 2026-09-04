import type { Finding } from "../finding.page-type.ts"

export const theNotifierTokenReadMovedOntoAkashaAndRegistrationIsRestored = {
  id: "01a060b2-779b-7000-8f96-d584577504b8",
  pageTypeSlug: "finding",
  slug: "the-notifier-token-read-moved-onto-akasha-and-registration-is-restored",
  domainSlug: "workspace-package/person-system",
  claim:
    "The notifier reads its device tokens from akasha through the pages system service, and `registerDeviceToken` writes again rather than raising. The blocker its refusal named was true and is gone. Both stores held the same three tokens byte for byte, so the move lost nothing. Alan's second device is still dark; what is repaired is that a fresh registration now reaches the sender.",
  evidence:
    "`tools/lib/push-notification/store.ts` asked `askComposed` for `user-id`, `token` and `bundle-id`, three keys sitting together only in `pages/device-token/*.md`. At 2ef388ccc6 it asks `deviceTokensFor` in `@akasha/person-system/device-token`, landed at 396aa1355b.\n\nBoth stores were compared by sha256 of every token before anything moved: three tokens each, the same three digests, 64 upper hexadecimal characters. Alan one under com.alanwalton.app, Jenny two under me.smilingjenny.app.\n\nThe bridge was driven rather than assumed. `personSlugForAccount` reads alan from 9ba554f7 and jenny from 9bc63b11 off `supabaseAuthUserId`, and the `ios-app` pages carry alanwalton to com.alanwalton.app and smilingjenny to me.smilingjenny.app. A token whose app no page carries refuses the whole read, since leaving one out is how a device goes quiet unseen.\n\nProof drove both roads together with `recipientsFor` for kind null, ask-alan and surplus-fall: same counts, same digests, same bundles, for the owner and for Jenny. No tick ran and the sender was never reached. `registerDeviceToken` was driven whole by registering the token Alan already holds, which rewrote one page at one path and left the set as it was. `dropDeviceToken` was driven over a token no page carries and wrote nothing.\n\nThe notifier was stopped 23:48:11 and started 23:56:38 MDT, because saving a file its wrapper follows restarts the daemon. Its journal over that window records zero deliveries.\n\n`pages/device-token/*.md` are still there and read by nothing.",
} as const satisfies Finding
