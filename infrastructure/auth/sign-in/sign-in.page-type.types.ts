import type { SignInContributor } from "akasha/infrastructure/auth/sign-in/properties/sign-in-contributor.relation-property.types.ts"
import type { SignInProvider } from "akasha/infrastructure/auth/sign-in/properties/sign-in-provider.text-property.types.ts"
import type { SignInSubjectHash } from "akasha/infrastructure/auth/sign-in/properties/sign-in-subject-hash.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type SignIn = Page & {
  provider: SignInProvider
  subjectHash: SignInSubjectHash
  contributor: SignInContributor
}
