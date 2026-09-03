import type { Finding } from "../finding.page-type.ts"

export const theCloudflareApiTokenNowStandsEncryptedTwiceInsideAkasha = {
  id: "01a0683c-3c7f-7b8e-8125-a4ac2c6176ec",
  pageTypeSlug: "finding",
  slug: "the-cloudflare-api-token-now-stands-encrypted-twice-inside-akasha",
  domainSlug: "domain/akasha-migration",
  claim:
    "Two encrypted copies of one credential now stand inside akasha. The page at akasha/service-system/secrets/pages/cloudflare-api-token.secret.ts places a value in the cluster secret `cloudflare-api-token` under `api-token`, and cluster-secrets/cloudflare-api-token.k8s-secret.sops.yaml is a whole Secret manifest of that name carrying that key. Whether they hold the same value cannot be settled without decrypting both, which Alan's ruling forbids, so neither was removed.",
  evidence:
    "Measured 2026-09-03 10:55 MDT.\n\nTHE MATCH IS ON FIELDS, NOT ON ID. The page states resourceName `cloudflare-api-token` and resourceKey `api-token`. The manifest's plaintext head reads kind: Secret, metadata.name: cloudflare-api-token, namespace: cert-manager, and its single encrypted entry under stringData is keyed `api-token`. Same resource, same key, two sources.\n\nWHY NEITHER WENT. Sops ciphertext differs for identical plaintext, so byte comparison settles nothing and only decryption would. Alan's ruling stands: leave live credentials where they are, he rotates before launch. Deleting the wrong one of two would lose the only working copy of a credential cert-manager needs to answer DNS01.\n\nWHO WOULD COLLIDE. deploy-system/secret/secret.ts:96-107 refuses a deploy where two secret pages place a value in one resource under one key. Only one of these two is a page, so that guard does not fire; the manifest path and the page path are separate and neither knows about the other.\n\nWHAT TO DO LATER. Once rotation happens, one of the two is the survivor and the other is deleted. Until then this is recorded rather than resolved.",
} as const satisfies Finding
