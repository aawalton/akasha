import type { Finding } from "../finding.page-type.ts"

export const cloudflareHoldsFourRoles = {
  id: "01a06555-9f3d-722f-8219-37bf1a92bfbe",
  pageTypeSlug: "finding",
  slug: "cloudflare-holds-four-roles",
  domainSlug: "domain/all-about-alan",
  claim:
    "Cloudflare holds four separate roles in Alan's infrastructure at once: registrar for alanwalton.com, tempereso.com and audhdalan.com; authoritative DNS; public ingress by Tunnel; and the validation channel through which Let's Encrypt issues his certificates. One vendor's departure or change of behaviour takes all four together, making it the highest-priority concentrated risk in his dependency graph outside his finances. What breaks, and which roles could move where, is unmapped.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 8 as `BIGTHREE/cloudflare-risk` (was item 2), which cites `notes/software-and-saas.md#cloudflare` and the load-bearing third-party list in `notes/personal-context.md`, and records the ranking as reaffirmed by the software-and-SaaS audit.\n\nThe item lists candidate moves I have not repeated as claims, since none has been made: another registrar, a second authoritative DNS provider in parallel, direct ingress or another provider in place of Tunnel, and validation through a second DNS provider once DNS is dual-homed.\n\nWhat I did not measure: I read neither note and did not inspect any DNS or registrar record, so all four roles are as the backlog states them. The ranking as highest-priority non-financial risk is the corpus's judgement, not one I derived.",
} as const satisfies Finding
