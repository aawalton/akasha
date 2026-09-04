import type { Finding } from "../finding.page-type.ts"

export const thePagesComputerFolderIsDesignRatherThanReconciliation = {
  id: "01a0657f-4923-745f-90ed-76cc077d0b9a",
  pageTypeSlug: "finding",
  slug: "the-pages-computer-folder-is-design-rather-than-reconciliation",
  domainSlug: "domain/akasha-migration",
  claim:
    "The infra half of the page folders was read as reconciliation because `web-app`, `ios-app`, `device-token`, `workstation-service` and `cluster-service` all exist in akasha. `pages/computer` is the exception and needs a page type written from nothing. akasha models what runs on a machine and never the machine, so the fourteen pages have no home and no regrouping to be found under another name.",
  evidence:
    "Read 2026-09-02 22:45. `find akasha -name '*.page-type.ts'` matching computer, appearance, workstation, device or host answers three: `device-secret`, `device-token` and `workstation-service`. None is about hardware. A search of akasha for host, machine, workstation or node names `capability-hosts` in the pages UI, the `pages-system-service` workstation service, and findings, so the regrouping that would make this absence a false alarm is not there.\n\nThe fourteen pages are an inventory of physical machines: six cluster nodes and eight household computers. `pages/computer/alans-pc.computer.md` carries brand, cost, cpu, cpu-score, display, display-refresh-rate, display-resolution, form-factor, gpu, gpu-score, gpu-size, link, model, operating-system, purchase-date, ram, ssd and status. That is eighteen properties, and roughly half want a number property rather than text.\n\nSo the work is a `computer` page type, some eighteen page property pages beneath it, and fourteen pages, against a folder that has not been written to in six days. It is the same size as a small design lane rather than the field-matching the other infra folders take, and reading it off the census as reconciliation would send an agent looking for a counterpart that was never written.",
} as const satisfies Finding
