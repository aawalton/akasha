import type { Finding } from "../finding.page-type.ts"

export const aKeyTakenOutOfASopsFileIsNotTakenOutOfTheClusterByApplyingIt = {
  id: "01a05bae-093f-7f51-9a6a-bbe4536158ec",
  pageTypeSlug: "finding",
  slug: "a-key-taken-out-of-a-sops-file-is-not-taken-out-of-the-cluster-by-applying-it",
  domainSlug: "domain/alan-harness",
  claim:
    "Applying a sops file to the cluster adds and changes keys but never takes one away. The last-applied configuration names `stringData` while the live Secret holds `data`, so the three-way merge finds nothing under `data` to delete and the dropped key stands on. A key removed from a sops file is removed from the cluster only by patching it out by name.",
  evidence:
    '`SMILINGJENNY_RELAY_SECRET` was taken out of both `alanwalton/web/deploy/secrets.sops.yaml` and `smilingjenny/web/deploy/secrets.sops.yaml`. `sops --decrypt <file> | kubectl apply -f - --dry-run=server` then listed the key in the resulting `.data` for both `alanwalton/alanwalton-secrets` and `smilingjenny/smilingjenny-secrets`, unchanged. What took it away was `kubectl -n <ns> patch secret <name> --type=json -p \'[{"op":"remove","path":"/data/SMILINGJENNY_RELAY_SECRET"}]\'`, after which Alan\'s Secret read 19 keys and Jenny\'s 8, the key absent from both. The same asymmetry guards rather than harms in the other direction: `SMILINGJENNY_DATABASE_URL` stands in Jenny\'s live Secret and in no sops file, and survived an apply for exactly this reason, which a server dry-run showed before the apply was run. Two consequences follow. A sops file is not a statement of what the cluster holds, only of what it is given, so the two drift silently and only a key-name read of the live Secret says which. And a key patched out is still held by a running pod, because `envFrom` resolves at pod creation: Alan\'s pod stopped seeing the secret at the rollout that followed, not at the patch.',
} as const satisfies Finding
