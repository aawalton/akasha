import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { HostAddress } from "akasha/machines/hosts/properties/host-address.text-property.ts"
import type { LoginUser } from "akasha/machines/hosts/properties/login-user.text-property.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type Host = Domain & {
  title: Title
  address?: HostAddress
  loginUser?: LoginUser
}
