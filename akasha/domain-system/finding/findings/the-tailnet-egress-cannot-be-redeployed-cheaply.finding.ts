import type { Finding } from "../finding.page-type.ts"

export const theTailnetEgressCannotBeRedeployedCheaply = {
  id: "01a05abf-bf21-7bd3-93e0-e09306a52a3b",
  pageTypeSlug: "finding",
  slug: "the-tailnet-egress-cannot-be-redeployed-cheaply",
  domainSlug: "page-type/cluster-service",
  claim:
    "The tailnet egress keeps its private-network enrolment in an emptyDir, so every restart enrols a fresh node under a fresh name and abandons the last one, and it can only do so while its pre-auth key is still good. Redeploying it is therefore not the free act its manifests suggest, which is why the new page store's traffic to it was left unnamed by any network policy rather than admitted by editing the egress.",
  evidence:
    "`infra/k8s/src/tailnet-egress/tailnet-egress.cluster-service.code.attachment.ts` mounts `/var/lib/tailscale` from a `state` volume declared `emptyDir: {}`, so nothing survives the pod. `tailscale status` on the workstation names five egress nodes: `tailnet-egress` and `tailnet-egress-q5ldznq5` and `tailnet-egress-zt3q5vyj` last seen 55 days ago, `tailnet-egress-7ya47pf8` 22 days ago, and `tailnet-egress-ailcgkrb` carrying the traffic now. Four of the five are dead enrolments left by restarts, and three abandoned `talos-subnet-router` nodes sit beside them. A restart that found the key in `tailnet-egress-auth` expired would leave the cluster with no way out at all, and that key is not read here. Against that, what an edit would have bought is decorative: `generated/network-policy.generated.yaml` carries a `default-deny` and one ingress allowance naming only the `auth-proxy` namespace, yet the page store's pod in the `page-store` namespace reaches port 1055 there and is answered, because the cluster runs flannel and flannel enforces no NetworkPolicy. Every policy in that namespace is already a statement of intent rather than a control. So the page store states its own egress to `tailnet-egress` on 1055 in its own namespace, and the matching ingress allowance on the egress side is owed. It should be written the next time that egress is deployed for a reason of its own, and the state should become a volume outliving the pod at the same time.",
} as const satisfies Finding
