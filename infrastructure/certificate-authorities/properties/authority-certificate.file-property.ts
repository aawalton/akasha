import type { FileProperty } from "@akasha/pages/file-property"

export type AuthorityCertificate = "pem"

export const authorityCertificate = {
  id: "01a0685e-1c21-7a40-9f3e-2b7c4d51e803",
  pageTypeSlug: "file-property",
  slug: "authority-certificate",
  propertySlug: "authority-certificate",
  definition: "the certificate an authority signs with, and is recognised by",
  fileName: "ca.crt",
  machineWritten: true,
} as const satisfies FileProperty
