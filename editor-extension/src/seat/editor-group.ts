export type ColumnNumber = number;

export const FIRST_COLUMN: ColumnNumber = 1;

export interface ColumnChoice {
	readonly column: ColumnNumber;
	readonly reason: 'remembered' | 'ancestor' | 'first';
}

export function chooseColumn(input: {
	readonly remembered: ColumnNumber | undefined;
	readonly ancestorColumn: ColumnNumber | undefined;
	readonly openColumns: readonly ColumnNumber[];
}): ColumnChoice {
	const { remembered, ancestorColumn, openColumns } = input;
	if (remembered !== undefined && openColumns.includes(remembered)) {
		return { column: remembered, reason: 'remembered' };
	}
	if (ancestorColumn !== undefined && openColumns.includes(ancestorColumn)) {
		return { column: ancestorColumn, reason: 'ancestor' };
	}
	return { column: firstColumn(openColumns), reason: 'first' };
}

export interface EditorLocation {
	readonly viewColumn: ColumnNumber;
}

export interface SeatTerminalOptions {
	readonly name: string;
	readonly location: EditorLocation;
}

export function seatTerminalOptions(name: string, column: ColumnNumber): SeatTerminalOptions {
	return { name, location: { viewColumn: column } };
}

export function firstColumn(openColumns: readonly ColumnNumber[]): ColumnNumber {
	let lowest: ColumnNumber | undefined;
	for (const column of openColumns) {
		if (lowest === undefined || column < lowest) { lowest = column; }
	}
	return lowest ?? FIRST_COLUMN;
}
