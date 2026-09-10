import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { HostAddress } from "./properties/host-address.text-property.ts"
import type { LoginUser } from "./properties/login-user.text-property.ts"

export type Host = Domain & {
  title: Title
  address?: HostAddress
  loginUser?: LoginUser
}
