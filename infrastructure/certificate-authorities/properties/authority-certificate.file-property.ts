import type { FileProperty } from "@akasha/pages/file-property"

export type AuthorityCertificate = "pem"

export const authorityCertificate = {
  id: "01a0685e-1c21-7a40-9f3e-2b7c4d51e803",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "authority-certificate",
  propertySlug: "authority-certificate",
  definition: "the certificate an authority signs with, and is recognised by",
  fileName: "ca.crt",
  generated: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The certificate is written in PEM rather than in DER.",
    },
    {
      invariantKind: "departure",
      statement: "PEM carries a certificate as base64 text.",
    },
  ],
} as const satisfies FileProperty
