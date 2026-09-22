import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const authorityCertificate = {
  id: "01a0685e-1c21-7a40-9f3e-2b7c4d51e803",
  type: "page-type/file-property",
  slug: "authority-certificate",
  propertySlug: "authority-certificate",
  definition: "the certificate with which an authority signs and by which it is recognised",
  extensions: ["pem"],
  fileName: "ca.crt",
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The certificate is written in PEM rather than in DER.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "PEM carries a certificate as base64 text.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
