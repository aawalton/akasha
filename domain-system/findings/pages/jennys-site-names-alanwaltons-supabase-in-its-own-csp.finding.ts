import type { Finding } from "../finding.page-type.ts"

export const jennysSiteNamesAlanwaltonsSupabaseInItsOwnCsp = {
  id: "01a05cee-d38f-7c49-8c2e-f6c10bfb30d8",
  pageTypeSlug: "finding",
  slug: "jennys-site-names-alanwaltons-supabase-in-its-own-csp",
  domainSlug: "domain/alan-harness",
  claim:
    "Jenny's site is not free of alanwalton.com. Her live CSP `connect-src` names `https://supabase.alanwalton.com`, and the tree states that host three times. A working memory saying her build named alanwalton.com nowhere was wrong, and wrong as reassurance. What her build carries no name of is Alan's site as a relay target. `SMILINGJENNY_RELAY_SECRET` is no secret name anywhere, so denying it named nothing.",
  evidence:
    'Live: `curl -D - https://smilingjenny.me/sign-in` answers `connect-src \'self\' https://supabase.alanwalton.com`. In the tree, `smilingjenny/web/server.ts:28` states `connectSrc: ["https://supabase.alanwalton.com"]`, and `smilingjenny/web/smilingjenny-web.cluster-service.code.attachment.ts:126` and `:129` state `NEXT_PUBLIC_SUPABASE_URL` and an electric shape url on that same host. Nothing in her tree names `alanwalton.com` as a relay target, which is the narrower thing worth saying.\n\nOn the secret names: her encrypted `smilingjenny/web/deploy/secrets.sops.yaml` and the cluster secret `smilingjenny-secrets` agree on eight keys, `READING_RELAY_SECRET` and `SMILINGJENNY_RING_CREDENTIAL` among them. `SMILINGJENNY_RELAY_SECRET` is spelled nowhere in the repository.\n\nTwo numbers checked afresh tonight. Her tile route, given `X-Ring-Credential` from the cluster value, answers 503 `{"ok":false,"error":"No reading."}` in 0.10s, 0.09s and 0.09s over three calls, not the 0.23s a working memory carried; the timing is noise over the internet and no page should hold it. Alan\'s site now reports `0c6fb83a1f3de8935aca1d8254dbc98b67d45d28` at `/api/live-version`, answers 200 at root, and his relay route takes `READING_RELAY_SECRET` and answers 400 `No reading.` exactly as hers does. Both tile routes answer 401 on that relay secret, hers as much as his.',
} as const satisfies Finding
