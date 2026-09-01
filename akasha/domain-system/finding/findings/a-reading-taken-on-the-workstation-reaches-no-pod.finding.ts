import type { Finding } from "../finding.page-type.ts"

export const aReadingTakenOnTheWorkstationReachesNoPod = {
  id: "01a05b44-9d69-766e-9a53-c9a456740d2f",
  pageTypeSlug: "finding",
  slug: "a-reading-taken-on-the-workstation-reaches-no-pod",
  domainSlug: "domain/monarch",
  claim:
    "Now that the reading is taken on the workstation, nothing carries it to the pod. The store answers a read out of the commit, and the reading is the one value declared never to be committed, so a pod asking the store for the readout is answered with the page and without the reading. The next intent, that Alan's categorization route answers from the readout rather than from Monarch, has no carrier yet and cannot be met by reading the store alone.",
  evidence:
    "`page-reading.module.ts:25` states `A body is read out of the commit rather than off the working tree`, and `:49` states that a path the commit does not carry answers as nothing. The reading lands at `monarch-unreviewed-transactions.readout.uncommitted.ts`, which `.gitignore:2` keeps out of every commit, so that path is never in one. Meanwhile the pod route still reads Monarch itself: `alanwalton/web/app/routes/api.categorization.ts:21-24` builds a ring reader whose `fetchCounts` calls `fetchRingCountsFromMonarch(process.env.MONARCH_COOKIE, now)`, holding the answer in process memory for five minutes and calling it stale after forty-five, per `shared/monarch-categorization-access/src/ring-reading.ts:3-5`. The pod holds its own copy of the cookie at `alanwalton/web/deploy/secrets.sops.yaml:23`. So today two readings exist and only the pod's feeds the widget. Closing the next intent needs one of three things chosen deliberately: a route on the page store that answers an uncommitted value, a relay from the workstation that pushes the reading to the pod, or a decision that this reading is committed after all and the three invariants forbidding it are rewritten. The call taken here: none of the three, because the intent worked was only that the taking move off the pod.",
} as const satisfies Finding
