import type { Finding } from "../finding.page-type.ts"

export const twentyK8sSecretSopsFilesInsideAkashaStandBesideNoPage = {
  id: "01a0683c-3c7f-7b37-b3ea-b6a2644934c4",
  pageTypeSlug: "finding",
  slug: "twenty-k8s-secret-sops-files-inside-akasha-stand-beside-no-page",
  domainSlug: "domain/akasha-migration",
  claim:
    "Every one of the twenty `*.k8s-secret.sops.yaml` files inside akasha stands beside no page. There is no `k8s-secret` page type and no `*.k8s-secret.ts` anywhere in the tree, so nothing declares which of their keys are secret, `akasha page-secret-show` cannot be pointed at them, and a folder sweep that keys on pages would take twenty encrypted credentials away without a page refusing.",
  evidence:
    "Measured 2026-09-03 11:0x MDT. `find akasha -name '*.k8s-secret.sops.yaml'` answers 20 files; for each, the sibling the naming rule requires — the same path with `.sops.yaml` replaced by `.ts` — does not exist. 20 of 20 are orphans.\n\nWHERE THEY STAND. Eighteen under akasha/service-system/cluster-services/pages/, in cloudflared, gotrue, grafana, headscale, pgbouncer, postgres-cnpg, postgrest, prometheus, registry and supabase-realtime; two under akasha/infrastructure/cluster-manifests/cluster-secrets/, being cloudflare-api-token and collections.\n\nWHY THE NAMING SAYS ORPHAN. akasha/pages-system/pages/file-name/page-file-name.module.code.ts:155 defines secretAt as the page path with `.ts` replaced by `.sops.yaml`, so `grafana.k8s-secret.sops.yaml` is the sidecar of a page `grafana.k8s-secret.ts`. `find akasha -name '*k8s-secret*' -name '*.ts'` answers nothing.\n\nWHY THEY STILL WORK. .sops.yaml at the repository root keys its first creation rule on the filename `\\.k8s-secret\\.sops\\.yaml$` with encrypted_regex `^(data|stringData)$`, so these are whole Kubernetes Secret manifests encrypted in place rather than page sidecars, and whatever applies them reads the yaml directly. They are sound as manifests and orphaned as pages.\n\nNOT TOUCHED. No file named here was read for its value, moved or deleted.",
} as const satisfies Finding
