import type { Finding } from "../finding.page-type.ts"

export const glowforgeVendorKillable = {
  id: "01a06555-9f3e-729c-80f2-e83bc616820f",
  pageTypeSlug: "finding",
  slug: "glowforge-vendor-killable",
  domainSlug: "domain/all-about-alan",
  claim:
    "Alan's GlowForge is both a self-reliance asset and a dependency on the vendor that sold it. It is the tool he fabricates repairs and replacements with, and it requires cloud connectivity to run, which means the vendor can disable it remotely. Nothing documents what breaks if that cloud disappears, and no local-operation path — third-party firmware, an open-source pivot, or offline-capable replacement hardware — has been identified in advance.",
  evidence:
    "My own reading of Abby's backlog at `~/abby-backlog-2026-08-06/`, migrated here as a finding. Carried in `backlog/personal-freedom.md` line 29 as `VENDOR/glowforge-cloud` (was item 18), which cites the tools and physical-repair section of `notes/personal-context.md` and names the three mitigation paths as things worth preparing in advance.\n\nThe double role is what makes it notable rather than routine: the same device is counted on the self-reliance side of the ledger and exposed on the vendor side.\n\nWhat I did not measure: I did not read `notes/personal-context.md`, and I did not check GlowForge's actual connectivity requirements or terms, so the remote-disable capability is the backlog's characterisation rather than something I verified against the product.",
} as const satisfies Finding
