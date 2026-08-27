---
id: 074dcfdb-cb43-5568-b5a7-4fa0d68c610b
slug: cert-expiry-alert-precedes-the-renewal
page-type-slug: finding
title: "Cert expiry alert precedes the renewal"
domain-slug: domain/global
---

# Claim

`CertManagerCertExpiringSoon` fires on certificates whose renewal is not yet due, and calls that state a wedge. Its threshold is a fixed 21 days to expiry, but a certificate sets its own renewal window, and one setting `renewBefore` narrower than 21 days is inside the alert's window for the whole gap between the two while cert-manager is behaving exactly as configured. The estate already scrapes a gauge carrying each certificate's own renewal time, and neither expiry rule reads it.

# Evidence

Measured 2026-08-12 against the live cluster, read-only, triaging two firings of this alert.

THE RULE. `packages/infra/k8s/prometheus/synth-alerts-infra.ts` gives `expr: certmanager_certificate_expiration_timestamp_seconds - time() < 21 * 24 * 3600`, commented "cert-manager renews at 30d before expiry; a cert still inside 21d-to-expiry means the renewal did not happen". 30 days is cert-manager's default for a 90-day certificate, a default rather than a property of any certificate.

THE TWO THAT FIRED, from 2026-08-11T19:26Z. `cnpg-system/barman-cloud-client` and `barman-cloud-server` both read Ready True, "Certificate is up to date and has not expired", revision 1, and both carry `duration` 2160h with `renewBefore` 360h — 90 days and 15 days, a sixth of the duration rather than a third. `notAfter` 2026-09-01T18:24:49Z, `renewalTime` 2026-08-17T18:24:49Z. On the day of the reading they stood 20 days from expiry and 5 days from a renewal not yet reached.

THE WINDOW. Threshold 21 days against a renewal at 15 leaves the alert firing for the 6 days before cert-manager acts, on every cycle, while both figures stand.

THE READING IT DOES NOT TAKE. `certmanager_certificate_renewal_timestamp_seconds` is scraped and carries one series per certificate — 1786991089 for both, which is that same 2026-08-17T18:24:49Z. No cert rule reads it.

THE STAKE CLAIMED. The rule reasons from "a wedged public cert takes down whatever it fronts". Both that fired are internal, from `selfsigned-issuer`, for CNPG's barman-cloud sidecar.

NOT ESTABLISHED. Whether any other certificate sets `renewBefore` under 21 days; three series exist and two were read for their spec. Whether 21 was chosen as a 9-day grace on the 30-day default, which would make it sound for default certificates and wrong only here. Whether `CertManagerCertNotReady`, the direct witness, has ever caught a genuine wedge — it reads condition False, both of these read Ready, so only the proxy spoke.
