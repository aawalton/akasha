import type { Finding } from "../finding.page-type.ts"

export const theAdoptedClusterWorkloadsDoNotFitTheClusterServicePageType = {
  id: "01a0655a-1c00-7001-b47d-6e319f8a2c55",
  pageTypeSlug: "finding",
  slug: "the-adopted-cluster-workloads-do-not-fit-the-cluster-service-page-type",
  domainSlug: "domain/akasha-migration",
  claim:
    "The eleven pages under `pages/cluster-service/` name workloads the cluster runs that this repository writes no manifest for, so none of them can say the image, replicas, container port and manifest code the akasha cluster-service page type requires.",
  evidence:
    "Each of the eleven carries a kind, a namespace, a resource name and a definition, and nothing else: barman-cloud, cert-manager with its cainjector and its webhook, cnpg-controller-manager, coredns, kube-flannel, kube-proxy, metallb-controller, metallb-speaker, metrics-server. The akasha page type makes image, replicas, container-port and manifest-code all required, and its six pages are every one of them a web app this repository builds. None of the eleven slugs is among the 46 cluster-service pages under `infra/`. Where infra does carry the component it carries something else: `infra/k8s/src/cert-manager/synth.ts` emits a cluster issuer and nothing more, `infra/k8s/src/cloudnative-pg/synth.ts` a namespace, `infra/k8s/src/metallb/synth.ts` an ip pool, while coredns, kube-proxy, kube-flannel and metrics-server have no directory at all. `infra/cluster-checks/src/checks/check-memory-qos.ts` lines 25 to 32 describe five vendored component manifests under `infra/k8s/src/*/k8s/`, but no directory matches that path, and line 17 makes the check refuse every call.",
} as const satisfies Finding
