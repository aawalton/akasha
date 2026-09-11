import type { authorityCertificate } from "akasha/infrastructure/networks/certificates/authorities/properties/authority-certificate.file-property.ts"

export type AuthorityCertificate = (typeof authorityCertificate.extensions)[number]
